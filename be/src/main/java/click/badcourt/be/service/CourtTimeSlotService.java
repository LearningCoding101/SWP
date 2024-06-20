package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.enums.CourtTSStatusEnum;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotManageResponse;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.*;

@Service
public class CourtTimeSlotService {

    @Autowired
    CourtTimeSlotRepository courtTimeSlotRepository;

    @Autowired
    TimeSlotRepository timeSlotRepository;

    @Autowired
    CourtRepository courtRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    public List<CourtTimeSlotResponse> getCourtTimeSlotsByCourtIdAndDate(Long cId, @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotsByDeletedFalseAndCourt_CourtId(cId);
        List<BookingDetail> bookingDTList = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        List<CourtTimeSlotResponse> courtTimeSlotResponses = new ArrayList<>();
        for (CourtTimeslot courtTimeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
            courtTimeSlotResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
            courtTimeSlotResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());

            courtTimeSlotResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
            courtTimeSlotResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
            courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);
            for (BookingDetail booking : bookingDTList) {
                if ((booking.getDate().getDate()==date.getDate() && booking.getDate().getMonth()==date.getMonth() && booking.getDate().getYear()==date.getYear()) && booking.getCourtTimeslot().getCourtTSlotID() == courtTimeslot.getCourtTSlotID()) {
                    courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
                }
            }
            courtTimeSlotResponses.add(courtTimeSlotResponse);
        }
        return courtTimeSlotResponses;
    }

    public List<CourtTimeSlotResponse> getCourtTimeSlotsByCourtIdAndDates(Long cId, @DateTimeFormat(pattern = "yyyy-MM-dd") Date startdatep, @DateTimeFormat(pattern = "yyyy-MM-dd") Date enddatep, DayOfWeek weekday) {
        List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotsByDeletedFalseAndCourt_CourtId(cId);
        List<BookingDetail> bookingDTList = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        List<CourtTimeSlotResponse> courtTimeSlotResponses = new ArrayList<>();
        Date startdate = new Date(startdatep.getDate(), startdatep.getMonth(), startdatep.getYear());
        Date enddate = new Date(enddatep.getDate(), enddatep.getMonth(), enddatep.getYear());
        for (CourtTimeslot courtTimeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
            courtTimeSlotResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
            courtTimeSlotResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());
            courtTimeSlotResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
            courtTimeSlotResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
            courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);
            for (BookingDetail booking : bookingDTList) {
                do
                {
                    if ((booking.getDate().getDate()==startdate.getDate() && booking.getDate().getMonth()==startdate.getMonth() && booking.getDate().getYear()==startdate.getYear()) && booking.getCourtTimeslot().getCourtTSlotID() == courtTimeslot.getCourtTSlotID())
                     /*&& booking.getDate().getDate()==startdate.getDate() && booking.getDate().getMonth()==startdate.getMonth() && booking.getDate().getYear()==startdate.getYear()*/
                    {
                        if(dayofweekreturn(startdate.getDay()) == weekday.getValue()){
                            courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
                        }
                    }
                    startdate.after(startdate);
                }while (enddate.compareTo(startdate) == 1 && courtTimeSlotResponse.getStatus() != CourtTSStatusEnum.IN_USE);
            }
            courtTimeSlotResponses.add(courtTimeSlotResponse);
        }
        return courtTimeSlotResponses;
    }

    public int dayofweekreturn(int i){
        if (i == 0) i += 7;
        return i;
    }

    public List<CourtTimeSlotManageResponse> getCourtTimeSlotsByCourtId(Long cId) {
        List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotsByDeletedFalseAndCourt_CourtId(cId);
        List<CourtTimeSlotManageResponse> courtTimeSlotManageResponses = new ArrayList<>();
        for (CourtTimeslot courtTimeslot : courtTimeslots) {
            CourtTimeSlotManageResponse courtTimeSlotManageResponse = new CourtTimeSlotManageResponse();
            courtTimeSlotManageResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
            courtTimeSlotManageResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
            courtTimeSlotManageResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());
            courtTimeSlotManageResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
            courtTimeSlotManageResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
            courtTimeSlotManageResponses.add(courtTimeSlotManageResponse);
        }
        return courtTimeSlotManageResponses;
    }

    public CourtTimeSlotRequest createCourtTimeSlot(CourtTimeSlotRequest courtTimeSlotRequest) {
        Optional<TimeSlot> timeSlotCheck = timeSlotRepository.findTimeSlotByDeletedFalseAndTimeslotId(courtTimeSlotRequest.getTimeSlotId());
        Optional<Court> courtCheck = courtRepository.findCourtByDeletedFalseAndCourtId(courtTimeSlotRequest.getCourtId());

        if((timeSlotCheck.isPresent()) && (courtCheck.isPresent())) {
            CourtTimeslot court_timeslot = new CourtTimeslot();
            court_timeslot.setTimeslot(timeSlotCheck.get());
            court_timeslot.setCourt(courtCheck.get());
            court_timeslot.setDeleted(false);
            courtTimeSlotRepository.save(court_timeslot);
            return courtTimeSlotRequest;
        }else {
            throw new IllegalArgumentException("Court or TimeSlot not found");
        }
    }

    public void deleteCourtTimeSlot(Long id) {
        CourtTimeslot courtTimeslot = courtTimeSlotRepository.findById(id).orElseThrow(() -> new RuntimeException("CourtTimeSlot not found!"));
        courtTimeslot.setDeleted(true);
        courtTimeSlotRepository.save(courtTimeslot);
    }

}

