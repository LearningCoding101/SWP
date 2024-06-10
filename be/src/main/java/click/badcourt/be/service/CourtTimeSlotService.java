package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.enums.CourtTSStatusEnum;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
        int count = 0;


        for (CourtTimeslot courtTimeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
            courtTimeSlotResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
            courtTimeSlotResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());
            courtTimeSlotResponse.setPrice(courtTimeslot.getCourt().getPrice());
            courtTimeSlotResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
            courtTimeSlotResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
            for (BookingDetail booking : bookingDTList) {
                if ((booking.getDate().compareTo(date) == 1) && booking.getCourtTimeslot().getCourtTSlotID() == courtTimeslot.getCourtTSlotID()) {
                    count = count + 1;
                }
            }
            if (count > 0) {
                courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
                count = 0;
            } else {
                courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);
            }

            courtTimeSlotResponses.add(courtTimeSlotResponse);
        }

        return courtTimeSlotResponses;
    }


    public CourtTimeSlotRequest createCourtTimeSlot(CourtTimeSlotRequest courtTimeSlotRequest) {
        Optional<TimeSlot> timeSlotCheck = timeSlotRepository.findTimeSlotByDeletedFalseAndTimeslotId(courtTimeSlotRequest.getTimeSlotId());
        Optional<Court> courtCheck = courtRepository.findCourtByDeletedFalseAndCourtId(courtTimeSlotRequest.getCourtId());

        if((timeSlotCheck.isPresent()) && (courtCheck.isPresent())) {
            CourtTimeslot court_timeslot = new CourtTimeslot();
            court_timeslot.setTimeslot(timeSlotCheck.get());
            court_timeslot.setCourt(courtCheck.get());
            court_timeslot.setDeleted(false);
            court_timeslot.setStatus(CourtTSStatusEnum.AVAILABLE);
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

