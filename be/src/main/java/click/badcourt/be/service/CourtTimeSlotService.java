package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.enums.BookingStatusEnum;
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
        List<BookingDetail> bookingDTList1 = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        List<BookingDetail> bookingDTList = new ArrayList<>();
        for (BookingDetail bookingDT : bookingDTList1) {
            if(!bookingDT.getBooking().getStatus().equals(BookingStatusEnum.CANCELED) ) bookingDTList.add(bookingDT);
        }
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
        List<BookingDetail> bookingDTList1 = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        List<BookingDetail> bookingDTList = new ArrayList<>();
        for (BookingDetail bookingDT : bookingDTList1) {
            if(!bookingDT.getBooking().getStatus().equals(BookingStatusEnum.CANCELED) ) bookingDTList.add(bookingDT);
        }
        List<CourtTimeSlotResponse> courtTimeSlotResponses = new ArrayList<>();

        // Initialize calendar instances for date manipulation
        Calendar startCalendar = Calendar.getInstance();
        startCalendar.setTime(startdatep);
        Calendar endCalendar = Calendar.getInstance();
        endCalendar.setTime(enddatep);

        // Loop through each court timeslot
        for (CourtTimeslot courtTimeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
            courtTimeSlotResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
            courtTimeSlotResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());
            courtTimeSlotResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
            courtTimeSlotResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
            courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);

            // Check each date within the range
            Calendar currentCalendar = (Calendar) startCalendar.clone();
            while (!currentCalendar.after(endCalendar)) {
                for (BookingDetail booking : bookingDTList) {
                    Calendar bookingCalendar = Calendar.getInstance();
                    bookingCalendar.setTime(booking.getDate());

                    // Check if the booking date matches the current date and timeslot
                    if (isSameDay(bookingCalendar, currentCalendar) &&
                            booking.getCourtTimeslot().getCourtTSlotID().equals(courtTimeslot.getCourtTSlotID()) &&
                            mapCalendarToDayOfWeek(bookingCalendar.get(Calendar.DAY_OF_WEEK)) == weekday) {

                        courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
                        break; // No need to check further bookings if the timeslot is already in use
                    }
                }

                if (courtTimeSlotResponse.getStatus() == CourtTSStatusEnum.IN_USE) {
                    break;
                }

                // Move to the next day
                currentCalendar.add(Calendar.DAY_OF_MONTH, 1);
            }

            // Add the response to the list
            courtTimeSlotResponses.add(courtTimeSlotResponse);
        }

        return courtTimeSlotResponses;
    }

    // Utility function to check if two calendar instances represent the same day
    private boolean isSameDay(Calendar cal1, Calendar cal2) {
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
                cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH) &&
                cal1.get(Calendar.DAY_OF_MONTH) == cal2.get(Calendar.DAY_OF_MONTH);
    }

    // Utility function to map Calendar.DAY_OF_WEEK to DayOfWeek
    private DayOfWeek mapCalendarToDayOfWeek(int calendarDayOfWeek) {
        switch (calendarDayOfWeek) {
            case Calendar.SUNDAY: return DayOfWeek.SUNDAY;
            case Calendar.MONDAY: return DayOfWeek.MONDAY;
            case Calendar.TUESDAY: return DayOfWeek.TUESDAY;
            case Calendar.WEDNESDAY: return DayOfWeek.WEDNESDAY;
            case Calendar.THURSDAY: return DayOfWeek.THURSDAY;
            case Calendar.FRIDAY: return DayOfWeek.FRIDAY;
            case Calendar.SATURDAY: return DayOfWeek.SATURDAY;
            default: throw new IllegalArgumentException("Invalid day of week: " + calendarDayOfWeek);
        }
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



//    public List<CourtTimeSlotResponse> getCourtTimeSlotsByCourtIdAndDates(Long cId, @DateTimeFormat(pattern = "yyyy-MM-dd") Date startdatep, @DateTimeFormat(pattern = "yyyy-MM-dd") Date enddatep, DayOfWeek weekday) {
//        List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotsByDeletedFalseAndCourt_CourtId(cId);
//        List<BookingDetail> bookingDTList1 = bookingDetailRepository.findBookingDetailsByDeletedFalse();
//        List<BookingDetail> bookingDTList = new ArrayList<>();
//        for (BookingDetail bookingDT : bookingDTList1) {
//            if(bookingDT.getBooking().getStatus()!= BookingStatusEnum.CANCELED) bookingDTList.add(bookingDT);
//        }
//        List<CourtTimeSlotResponse> courtTimeSlotResponses = new ArrayList<>();
//        Date startdate = new Date(startdatep.getDate(), startdatep.getMonth(), startdatep.getYear());
//        Date enddate = new Date(enddatep.getDate(), enddatep.getMonth(), enddatep.getYear());
//        List<Date> dateList = getDateFromWeekday(startdate, enddate, weekday);
//        for (CourtTimeslot courtTimeslot : courtTimeslots) {
//            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
//            courtTimeSlotResponse.setCourtTimeSlotId(courtTimeslot.getCourtTSlotID());
//            courtTimeSlotResponse.setCourtId(courtTimeslot.getCourt().getCourtId());
//            courtTimeSlotResponse.setTimeSlotId(courtTimeslot.getTimeslot().getTimeslotId());
//            courtTimeSlotResponse.setStart_time(courtTimeslot.getTimeslot().getStart_time());
//            courtTimeSlotResponse.setEnd_time(courtTimeslot.getTimeslot().getEnd_time());
//            courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);
//            for (BookingDetail booking : bookingDTList) {
//                for (Date date : dateList) {
//                    if ((booking.getDate().getDate() == date.getDate() && booking.getDate().getMonth() == date.getMonth() && booking.getDate().getYear() == date.getYear()) && booking.getCourtTimeslot().getCourtTSlotID() == courtTimeslot.getCourtTSlotID()) {
//                        courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
//                    }
//                }
//            }
//            courtTimeSlotResponses.add(courtTimeSlotResponse);
//        }
//        return courtTimeSlotResponses;
//    }
//    public List<Date> getDateFromWeekday(Date startdate, Date enddate, DayOfWeek weekday) {
//        List<Date> dates = new ArrayList<>();
//        List<Date> datess = new ArrayList<>();
//        do{
//            datess.add(startdate);
//            startdate=getDateAfter(startdate);
//        }while (enddate.compareTo(startdate) == 1);
//        for(Date date : datess){
//            if(dayofweekreturn(date.getDay()) == weekday.getValue()){
//                dates.add(date);
//            }
//        }
//        return dates;
//    }
//    public Date getDateAfter(Date date) {
//        // Create a Calendar instance and set it to the provided date
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(date);
//
//        // Add one day to the calendar
//        calendar.add(Calendar.DAY_OF_YEAR, 1);
//
//        // Return the updated date
//        return calendar.getTime();
//    }
//    public Date getDateAfter2(Date date) {
//        LocalDate localDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDate());
//        localDate = localDate.plusDays(1);
//        return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
//    }
//    public int dayofweekreturn(int i){
//        if (i == 0) i += 7;
//        return i;
//    }

}

