package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.BookingDetail;

import click.badcourt.be.entity.CourtTimeslot;
import click.badcourt.be.model.request.BookingDetailRequest;
import click.badcourt.be.model.request.FixedBookingDetailRequest;
import click.badcourt.be.model.response.BookingDetailDeleteResponse;
import click.badcourt.be.model.response.BookingDetailResponse;
import click.badcourt.be.repository.BookingDetailRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import click.badcourt.be.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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

    public List<BookingDetailResponse> getBookingDetailByBookingId(Long bookingId) {
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingId);
        if(bookingOptional.isPresent()){
            List<BookingDetail> bookingDetails = bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);

            List<BookingDetailResponse> bookingDetailResponses= new ArrayList<>();
            for(BookingDetail bookingDetail : bookingDetails){
                BookingDetailResponse bookingDetailResponse= new BookingDetailResponse();
                bookingDetailResponse.setBookingDetailsId(bookingDetail.getBookingDetailsId());
                bookingDetailResponse.setBookingDate(bookingDetail.getDate());
                bookingDetailResponse.setBookingId(bookingDetail.getBooking().getBookingId());
                bookingDetailResponse.setCourtTSId(bookingDetail.getCourtTimeslot().getCourtTSlotID());
                bookingDetailResponse.setFullnameoforder(accountUtils.getCurrentAccount().getFullName());
                bookingDetailResponse.setPhonenumber(accountUtils.getCurrentAccount().getPhone());
                bookingDetailResponse.setCourtName(bookingDetail.getCourtTimeslot().getCourt().getCourtname());
                bookingDetailResponse.setStart_time(bookingDetail.getCourtTimeslot().getTimeslot().getStart_time());
                bookingDetailResponse.setEnd_time(bookingDetail.getCourtTimeslot().getTimeslot().getEnd_time());
                bookingDetailResponses.add(bookingDetailResponse);
            }
            return bookingDetailResponses;
        }
        else {
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

        List<BookingDetailResponse> bookingDetailsResponses = bookingDates.stream().map(date -> {
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



            return response;
        }).collect(Collectors.toList());

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
            bookingDetailRepository.save(bookingDetail);
            return bookingDetailRequest;
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
                bookingDetail.get().setBooking(bookingOptional.get());
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
}
