package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.BookingDetail;

import click.badcourt.be.entity.CourtTimeslot;
import click.badcourt.be.model.request.BookingDetailRequest;
import click.badcourt.be.model.response.BookingDetailDeleteResponse;
import click.badcourt.be.model.response.BookingDetailResponse;
import click.badcourt.be.repository.BookingDetailRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import click.badcourt.be.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
