package click.badcourt.be.service;

import click.badcourt.be.entity.*;

import click.badcourt.be.entity.CourtTimeslot;
import click.badcourt.be.enums.BookingDetailStatusEnum;
import click.badcourt.be.model.request.BookingDetailRequest;
import click.badcourt.be.model.request.BookingDetailRequestCombo;
import click.badcourt.be.model.request.FixedBookingDetailRequest;
import click.badcourt.be.model.response.BookingDetailDeleteResponse;
import click.badcourt.be.model.response.BookingDetailResponse;
import click.badcourt.be.model.response.BookingDetailsCustomerResponse;
import click.badcourt.be.repository.BookingDetailRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.CourtRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import click.badcourt.be.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class BookingDetailService {

    @Autowired
    BookingDetailRepository bookingDetailRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    CourtTimeSlotRepository courtTimeSlotRepository;
    @Autowired
    private AccountUtils accountUtils;
    @Autowired
    private CourtRepository courtRepository;

    public List<BookingDetailDeleteResponse> getAllBookingDetails() {
        List<BookingDetail> bookingDeleteDetails= bookingDetailRepository.findAll();
        List<BookingDetailDeleteResponse> bookingDetailDeleteResponses= new ArrayList<>();
        for(BookingDetail bookingDeleteDetail : bookingDeleteDetails){
            BookingDetailDeleteResponse bookingDetailDeletedResponse= new BookingDetailDeleteResponse();
            bookingDetailDeletedResponse.setBookingDate(bookingDeleteDetail.getDate());
            bookingDetailDeletedResponse.setBookingId(bookingDeleteDetail.getBooking().getBookingId());
            bookingDetailDeletedResponse.setCourtTSId(bookingDeleteDetail.getCourtTimeslot().getCourtTSlotID());
            bookingDetailDeletedResponse.setDeleted(bookingDeleteDetail.isDeleted());
            bookingDetailDeleteResponses.add(bookingDetailDeletedResponse);
        }
        return bookingDetailDeleteResponses;
    }

    public List<BookingDetailResponse> getBookingDetailByBookingIdQrCheck(Long bookingId) {
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingId);
        Long ownerId= accountUtils.getCurrentAccount().getAccountId();
        if(bookingOptional.isPresent() && Objects.equals(bookingOptional.get().getClub().getAccount().getAccountId(), ownerId)){
            List<BookingDetail> bookingDetails = bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);

            List<BookingDetailResponse> bookingDetailResponses= new ArrayList<>();
            for(BookingDetail bookingDetail : bookingDetails){
                BookingDetailResponse bookingDetailResponse= new BookingDetailResponse();
                bookingDetailResponse.setBookingDate(bookingDetail.getDate());
                bookingDetailResponse.setBookingId(bookingDetail.getBooking().getBookingId());
                bookingDetailResponse.setCourtTSId(bookingDetail.getCourtTimeslot().getCourtTSlotID());
                bookingDetailResponse.setBookingDetailsId(bookingDetail.getBookingDetailsId());
                bookingDetailResponse.setCourtName(bookingDetail.getCourtTimeslot().getCourt().getCourtname());
                bookingDetailResponse.setFullnameoforder(bookingDetail.getBooking().getAccount().getFullName());
                bookingDetailResponse.setPhonenumber(bookingDetail.getBooking().getAccount().getPhone());
                bookingDetailResponse.setStart_time(bookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
                bookingDetailResponse.setEnd_time(bookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());
                bookingDetailResponse.setStatus(bookingDetail.getDetailStatus());
                bookingDetailResponse.setTimeslotId(bookingDetail.getCourtTimeslot().getTimeslot().getTimeslotId());
                bookingDetailResponses.add(bookingDetailResponse);
            }
            return bookingDetailResponses;
        }
        else {
            return null;
        }
    }

    public List<BookingDetailResponse> getBookingDetailByBookingId(Long bookingId) {
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingId);
        if(bookingOptional.isPresent()){
            List<BookingDetail> bookingDetails = bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);

            List<BookingDetailResponse> bookingDetailResponses= new ArrayList<>();
            for(BookingDetail bookingDetail : bookingDetails){
                BookingDetailResponse bookingDetailResponse= new BookingDetailResponse();
                bookingDetailResponse.setBookingDate(bookingDetail.getDate());
                bookingDetailResponse.setBookingId(bookingDetail.getBooking().getBookingId());
                bookingDetailResponse.setCourtTSId(bookingDetail.getCourtTimeslot().getCourtTSlotID());
                bookingDetailResponse.setBookingDetailsId(bookingDetail.getBookingDetailsId());
                bookingDetailResponse.setCourtName(bookingDetail.getCourtTimeslot().getCourt().getCourtname());
                bookingDetailResponse.setFullnameoforder(bookingDetail.getBooking().getAccount().getFullName());
                bookingDetailResponse.setPhonenumber(bookingDetail.getBooking().getAccount().getPhone());
                bookingDetailResponse.setStart_time(bookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
                bookingDetailResponse.setEnd_time(bookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());
                bookingDetailResponse.setStatus(bookingDetail.getDetailStatus());
                bookingDetailResponses.add(bookingDetailResponse);
            }
            return bookingDetailResponses;
        }
        else {
            throw new IllegalArgumentException("Booking not found");
        }
    }

    public List<BookingDetailResponse> getBookingDetailByCourtId(Long courtId, @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
            List<BookingDetail> bookingDetails = new ArrayList<>();
        List<BookingDetail> finding = new ArrayList<>();
            List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotsByCourt_CourtId(courtId);
            for(CourtTimeslot courtTimeslot : courtTimeslots){
                finding = bookingDetailRepository.findBookingDetailsByCourtTimeslot_CourtTSlotID(courtTimeslot.getCourtTSlotID());
                bookingDetails.addAll(finding);
            }

            List<BookingDetailResponse> bookingDetailResponses= new ArrayList<>();
            for(BookingDetail bookingDetail : bookingDetails){
                if(date.getDate()==bookingDetail.getDate().getDate() && date.getMonth()==bookingDetail.getDate().getMonth() && date.getYear()==bookingDetail.getDate().getYear()) {
                    BookingDetailResponse bookingDetailResponse = new BookingDetailResponse();
                    bookingDetailResponse.setBookingDate(bookingDetail.getDate());
                    bookingDetailResponse.setBookingId(bookingDetail.getBooking().getBookingId());
                    bookingDetailResponse.setCourtTSId(bookingDetail.getCourtTimeslot().getCourtTSlotID());
                    bookingDetailResponse.setBookingDetailsId(bookingDetail.getBookingDetailsId());
                    bookingDetailResponse.setCourtName(bookingDetail.getCourtTimeslot().getCourt().getCourtname());
                    bookingDetailResponse.setFullnameoforder(bookingDetail.getBooking().getAccount().getFullName());
                    bookingDetailResponse.setPhonenumber(bookingDetail.getBooking().getAccount().getPhone());
                    bookingDetailResponse.setStart_time(bookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
                    bookingDetailResponse.setEnd_time(bookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());
                    bookingDetailResponse.setStatus(bookingDetail.getDetailStatus());
                    bookingDetailResponse.setTimeslotId(bookingDetail.getCourtTimeslot().getTimeslot().getTimeslotId());
                    bookingDetailResponses.add(bookingDetailResponse);
                }
            }
            return bookingDetailResponses;
    }

    public List<BookingDetailsCustomerResponse> getBookingCustomerBookingDetailByBookingId(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            List<BookingDetail> bookingDetails = bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            List<BookingDetailsCustomerResponse> bookingDetailsCustomerResponses = new ArrayList<>();
            for (BookingDetail bookingDetail : bookingDetails) {
                BookingDetailsCustomerResponse bookingDetailsCustomerResponse = new BookingDetailsCustomerResponse();
                bookingDetailsCustomerResponse.setBookingDetailsId(bookingDetail.getBookingDetailsId());
                bookingDetailsCustomerResponse.setPhonenumber(accountUtils.getCurrentAccount().getPhone());
                String formattedDate = dateFormat.format(bookingDetail.getDate());
                bookingDetailsCustomerResponse.setDate(formattedDate);
                Calendar calendar = new GregorianCalendar();
                calendar.setTime(bookingDetail.getDate());
                int dayOfWeekNumeric = calendar.get(Calendar.DAY_OF_WEEK);
                int adjustedDayOfWeekNumeric = dayOfWeekNumeric == 1 ? 7 : dayOfWeekNumeric - 1;
                DayOfWeek dayOfWeek = DayOfWeek.of(adjustedDayOfWeekNumeric);
                bookingDetailsCustomerResponse.setDayOfWeek(dayOfWeek);
                bookingDetailsCustomerResponse.setCourtName(bookingDetail.getCourtTimeslot().getCourt().getCourtname());
                bookingDetailsCustomerResponse.setStart_time(bookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
                bookingDetailsCustomerResponse.setEnd_time(bookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());
                bookingDetailsCustomerResponses.add(bookingDetailsCustomerResponse);



            }
            return bookingDetailsCustomerResponses;
        } else {
            throw new IllegalArgumentException("Booking not found");
        }
    }




    public List<BookingDetailResponse> createFixedBookings(FixedBookingDetailRequest request) {
        LocalDate startDate = request.getStartDate();
        DayOfWeek dayOfWeek = request.getDayOfWeek();
        LocalDate endDate = startDate.plusMonths(request.getDurationInMonths()).with(TemporalAdjusters.previousOrSame(dayOfWeek));
        //LocalDate endDate = startDate.plusMonths(request.getDurationInMonths()).with(TemporalAdjusters.lastInMonth(dayOfWeek));
        //ex Nếu ngày bắt đầu của bạn là 2080-16-09 (là Thứ Hai) và thời hạn của bạn là 1 tháng và bạn cần Thứ Năm:
        //Ngày kết thúc ban đầu sẽ là 2080-17-10 (một tháng sau).
        //Việc điều chỉnh bằng LastInMonth(THURSDAY) sẽ đặt ngày kết thúc của bạn thành Thứ Năm cuối cùng của tháng 10 năm 2080.
        //Việc điều chỉnh bằng previousOrSame(THURSDAY) sẽ đặt ngày kết thúc của bạn thành Thứ Năm đầu tiên vào hoặc sau ngày 17-10 năm 2080.
        LocalDate nextDayOfWeek = startDate.with(TemporalAdjusters.nextOrSame(dayOfWeek));
        long weeksBetween = ChronoUnit.WEEKS.between(nextDayOfWeek, endDate);
        long occurrences = startDate.getDayOfWeek() == dayOfWeek ? weeksBetween + 1 : weeksBetween;
        //dong nay giai quyet van de ve so thu xuat hien trong thoi han 1 thang bi nhieu hon so vo so thu trong so thang yeu cau
        List<LocalDate> bookingDates = IntStream.iterate(0, i -> i + 1)
                .mapToObj(i -> nextDayOfWeek.plusWeeks(i))
                .limit(occurrences)
                .collect(Collectors.toList());


        List<BookingDetail> existingBookings = bookingDetailRepository.findBookingDetailsByDeletedFalse();

        List<BookingDetailResponse> bookingDetailsResponses = new ArrayList<>();

        for (LocalDate date : bookingDates) {

            boolean isAvailable = existingBookings.stream()
                    .noneMatch(bookingdt ->
                            bookingdt.getDate().compareTo(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant())) == 0 &&
                                    bookingdt.getCourtTimeslot().getCourtTSlotID() == request.getCourtTSId());

            if (!isAvailable) {
                throw new IllegalArgumentException("CourtTimeslot are already in use");
            }


            BookingDetail bookingDetail = new BookingDetail();
            bookingDetail.setBooking(bookingRepository.findById(request.getBookingId()).orElseThrow(() -> new RuntimeException("Booking not found")));
            bookingDetail.setCourtTimeslot(courtTimeSlotRepository.findById(request.getCourtTSId()).orElseThrow(() -> new RuntimeException("CourtTimeslot not found")));
            bookingDetail.setDate(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            bookingDetail.setDeleted(false);


            BookingDetail savedBookingDetail = bookingDetailRepository.save(bookingDetail);

            BookingDetailResponse response = new BookingDetailResponse();

            response.setBookingDetailsId(savedBookingDetail.getBookingDetailsId());
            response.setBookingDate(savedBookingDetail.getDate());
            response.setCourtTSId(savedBookingDetail.getCourtTimeslot().getCourtTSlotID());
            response.setBookingId(savedBookingDetail.getBooking().getBookingId());
            response.setCourtName(savedBookingDetail.getCourtTimeslot().getCourt().getCourtname());
            response.setFullnameoforder(savedBookingDetail.getBooking().getAccount().getFullName());
            response.setPhonenumber(savedBookingDetail.getBooking().getAccount().getPhone());
            response.setStart_time(savedBookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
            response.setEnd_time(savedBookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());

            bookingDetailsResponses.add(response);
        }

        return bookingDetailsResponses;
    }


    public List<BookingDetailRequest> createFixedBookingDetailCombos(BookingDetailRequestCombo request, Long id) {
        LocalDate startDate = request.getBookingDate();
        DayOfWeek dayOfWeek = request.getDayOfWeek();
        LocalDate endDate = startDate.plusMonths(request.getDurationInMonths()).with(TemporalAdjusters.previousOrSame(dayOfWeek));
        //LocalDate endDate = startDate.plusMonths(request.getDurationInMonths()).with(TemporalAdjusters.lastInMonth(dayOfWeek));
        //ex Nếu ngày bắt đầu của bạn là 2080-16-09 (là Thứ Hai) và thời hạn của bạn là 1 tháng và bạn cần Thứ Năm:
        //Ngày kết thúc ban đầu sẽ là 2080-17-10 (một tháng sau).
        //Việc điều chỉnh bằng LastInMonth(THURSDAY) sẽ đặt ngày kết thúc của bạn thành Thứ Năm cuối cùng của tháng 10 năm 2080.
        //Việc điều chỉnh bằng previousOrSame(THURSDAY) sẽ đặt ngày kết thúc của bạn thành Thứ Năm đầu tiên vào hoặc sau ngày 17-10 năm 2080.
        LocalDate nextDayOfWeek = startDate.with(TemporalAdjusters.nextOrSame(dayOfWeek));
        long weeksBetween = ChronoUnit.WEEKS.between(nextDayOfWeek, endDate);
        long occurrences = startDate.getDayOfWeek() == dayOfWeek ? weeksBetween + 1 : weeksBetween;
        //dong nay giai quyet van de ve so thu xuat hien trong thoi han 1 thang bi nhieu hon so vo so thu trong so thang yeu cau
        List<LocalDate> bookingDates = IntStream.iterate(0, i -> i + 1)
                .mapToObj(i -> nextDayOfWeek.plusWeeks(i))
                .limit(occurrences)
                .collect(Collectors.toList());


        List<BookingDetail> existingBookings = bookingDetailRepository.findBookingDetailsByDeletedFalse();

        List<BookingDetailRequest> bookingDetailsResponses = new ArrayList<>();

        for (LocalDate date : bookingDates) {

            boolean isAvailable = existingBookings.stream()
                    .noneMatch(bookingdt ->
                            bookingdt.getDate().compareTo(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant())) == 0 &&
                                    bookingdt.getCourtTimeslot().getCourtTSlotID() == request.getCourtTSId());

            if (!isAvailable) {
                throw new IllegalArgumentException("CourtTimeslot are already in use");
            }


            BookingDetail bookingDetail = new BookingDetail();
            bookingDetail.setBooking(bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found")));
            bookingDetail.setCourtTimeslot(courtTimeSlotRepository.findById(request.getCourtTSId()).orElseThrow(() -> new RuntimeException("CourtTimeslot not found")));
            bookingDetail.setDate(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            bookingDetail.setDeleted(false);


            BookingDetail savedBookingDetail = bookingDetailRepository.save(bookingDetail);

            BookingDetailRequest response = new BookingDetailRequest();

            response.setBookingDate(savedBookingDetail.getDate());
            response.setCourtTSId(savedBookingDetail.getCourtTimeslot().getCourtTSlotID());
            response.setBookingId(savedBookingDetail.getBooking().getBookingId());

            bookingDetailsResponses.add(response);
        }

        return bookingDetailsResponses;
    }



    public BookingDetailRequest createBookingDetail(BookingDetailRequest bookingDetailRequest) {
        List<BookingDetail> bookingDTList = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        for (BookingDetail bookingdt : bookingDTList) {
            if ((bookingdt.getDate().compareTo(bookingDetailRequest.getBookingDate()) == 0) && bookingdt.getCourtTimeslot().getCourtTSlotID() == bookingDetailRequest.getCourtTSId()) {
                throw new IllegalArgumentException("CourtTimeslot are already in use");
            }
        }

        BookingDetail bookingDetail= new BookingDetail();
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingDetailRequest.getBookingId());
        Optional<CourtTimeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){
            bookingDetail.setBooking(bookingOptional.get());
            bookingDetail.setCourtTimeslot(courtTimeslot.get());
            bookingDetail.setDate(bookingDetailRequest.getBookingDate());
            bookingDetail.setDeleted(false);
            bookingDetail.setDetailStatus(BookingDetailStatusEnum.NOT_YET);
            bookingDetailRepository.save(bookingDetail);
            return bookingDetailRequest;
        }
        else {
            throw new IllegalArgumentException("Booking or CourtTimeslot not found");
        }
    }

    public BookingDetailRequest create1stBookingDetailCombo(BookingDetailRequestCombo bookingDetailRequest, Long id) {
        LocalDate startDate = bookingDetailRequest.getBookingDate();
        Date datee = Date.from(startDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        List<BookingDetail> bookingDTList = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        for (BookingDetail bookingdt : bookingDTList) {
            if ((bookingdt.getDate().compareTo(datee) == 0) && bookingdt.getCourtTimeslot().getCourtTSlotID() == bookingDetailRequest.getCourtTSId()) {
                throw new IllegalArgumentException("CourtTimeslot are already in use");
            }
        }

        BookingDetail bookingDetail= new BookingDetail();
        Optional<Booking> bookingOptional= bookingRepository.findById(id);
        Optional<CourtTimeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        BookingDetailRequest returnBookingDetailRequest = new BookingDetailRequest();
        if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){
            bookingDetail.setBooking(bookingOptional.get());
            bookingDetail.setCourtTimeslot(courtTimeslot.get());
            bookingDetail.setDate(datee);
            bookingDetail.setDeleted(false);
            bookingDetail.setDetailStatus(BookingDetailStatusEnum.NOT_YET);
            bookingDetailRepository.save(bookingDetail);
            returnBookingDetailRequest.setBookingId(id);
            returnBookingDetailRequest.setBookingDate(datee);
            returnBookingDetailRequest.setCourtTSId(courtTimeslot.get().getCourtTSlotID());
            return returnBookingDetailRequest;
        }
        else {
            throw new IllegalArgumentException("Booking or CourtTimeslot not found");
        }
    }

    public BookingDetailRequest create3rdBookingDetailCombo(BookingDetailRequestCombo bookingDetailRequest, Long id) {
        LocalDate startDate = bookingDetailRequest.getBookingDate();
        Date datee = Date.from(startDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        List<BookingDetail> bookingDTList = bookingDetailRepository.findBookingDetailsByDeletedFalse();
        for (BookingDetail bookingdt : bookingDTList) {
            if ((bookingdt.getDate().compareTo(datee) == 0) && bookingdt.getCourtTimeslot().getCourtTSlotID() == bookingDetailRequest.getCourtTSId()) {
                throw new IllegalArgumentException("CourtTimeslot are already in use");
            }
        }

        BookingDetail bookingDetail= new BookingDetail();
        Optional<Booking> bookingOptional= bookingRepository.findById(id);
        Optional<CourtTimeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        BookingDetailRequest returnBookingDetailRequest = new BookingDetailRequest();
        if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){
            bookingDetail.setBooking(bookingOptional.get());
            bookingDetail.setCourtTimeslot(courtTimeslot.get());
            bookingDetail.setDate(datee);
            bookingDetail.setDeleted(false);
            bookingDetail.setDetailStatus(BookingDetailStatusEnum.NOT_YET);
            bookingDetailRepository.save(bookingDetail);
            returnBookingDetailRequest.setBookingId(id);
            returnBookingDetailRequest.setBookingDate(datee);
            returnBookingDetailRequest.setCourtTSId(courtTimeslot.get().getCourtTSlotID());
            return returnBookingDetailRequest;
        }
        else {
            throw new IllegalArgumentException("Booking or CourtTimeslot not found");
        }
    }



    public BookingDetailRequest updateBookingDetail(BookingDetailRequest bookingDetailRequest,Long bookingDetailId) {
        Optional<BookingDetail> bookingDetail= bookingDetailRepository.findById(bookingDetailId);
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingDetailRequest.getBookingId());
        Optional<CourtTimeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        if(bookingDetail.isPresent()){
            if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){

                bookingDetail.get().setCourtTimeslot(courtTimeslot.get());
                bookingDetailRepository.save(bookingDetail.get());
                return bookingDetailRequest;
            }
            else {
                throw new IllegalArgumentException("Booking or Court_Timeslot not found");
            }
        }
        else{
            throw new IllegalArgumentException("BookingDetail Id not found");
        }
    }

    public void deleteBookingDetail(Long bookingDetailId) {
        BookingDetail bookingDetail= bookingDetailRepository.findById(bookingDetailId).orElseThrow(() -> new RuntimeException("BookingDetail not found!"));
        bookingDetail.setDeleted(true);

        bookingDetailRepository.save(bookingDetail);
    }
    public void checkin(Long id){
        Optional<BookingDetail> bookingDetail= bookingDetailRepository.findById(id);
        bookingDetail.ifPresent(detail -> detail.setDetailStatus(BookingDetailStatusEnum.CHECKED_IN));
        bookingDetailRepository.save(bookingDetail.get());
    }
    public Map<String, Integer> getBookingsCountByDayOfWeek() {
        // Use the correct method based on your DB
        List<Object[]> results = bookingDetailRepository.countBookingsByDayOfWeek();
        Map<String, Integer> bookingsCountByDayOfWeek = new HashMap<>();

        String[] daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

        for (Object[] result : results) {
            int dayOfWeekIndex = ((Number) result[0]).intValue();
            int count = ((Number) result[1]).intValue();
            String dayOfWeek = daysOfWeek[dayOfWeekIndex - 1]; // Adjust indexing if necessary
            bookingsCountByDayOfWeek.put(dayOfWeek, count);
        }

        return bookingsCountByDayOfWeek;
    }


}
