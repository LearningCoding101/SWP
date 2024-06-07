package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.Booking_Detail;
import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.model.request.BookingDetailRequest;
import click.badcourt.be.model.request.BookingRequest;
import click.badcourt.be.model.response.BookingDetailDeleteResponse;
import click.badcourt.be.model.response.BookingDetailResponse;
import click.badcourt.be.repository.BookingDetailRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingDetailService {
    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CourtTimeSlotRepository courtTimeSlotRepository;

    public List<BookingDetailDeleteResponse> getAllBookingDetails() {
        List<Booking_Detail> bookingDeleteDetails= bookingDetailRepository.findAll();
        List<BookingDetailDeleteResponse> bookingDetailDeleteResponses= new ArrayList<>();
        for(Booking_Detail bookingDeleteDetail : bookingDeleteDetails){
            BookingDetailDeleteResponse bookingDetailDeletedResponse= new BookingDetailDeleteResponse();
            bookingDetailDeletedResponse.setBookingDate(bookingDeleteDetail.getDate());
            bookingDetailDeletedResponse.setBookingId(bookingDeleteDetail.getBooking().getBookingId());
            bookingDetailDeletedResponse.setCourtTSId(bookingDeleteDetail.getCourt_timeslot().getCourt_TSlot_ID());
            bookingDetailDeletedResponse.setDeleted(bookingDeleteDetail.isDeleted());
            bookingDetailDeleteResponses.add(bookingDetailDeletedResponse);
        }
        return bookingDetailDeleteResponses;
    }
    public List<BookingDetailResponse> getBookingDetailByBookingId(Long bookingId) {
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingId);
        if(bookingOptional.isPresent()){
            List<Booking_Detail> bookingDetails= bookingDetailRepository.findByDeletedFalseAndBooking_Id(bookingId);
            List<BookingDetailResponse> bookingDetailResponses= new ArrayList<>();
            for(Booking_Detail bookingDetail : bookingDetails){
                BookingDetailResponse bookingDetailResponse= new BookingDetailResponse();
                bookingDetailResponse.setBookingDate(bookingDetail.getDate());
                bookingDetailResponse.setBookingId(bookingDetail.getBooking().getBookingId());
                bookingDetailResponse.setCourtTSId(bookingDetail.getCourt_timeslot().getCourt_TSlot_ID());
                bookingDetailResponses.add(bookingDetailResponse);
            }
            return bookingDetailResponses;
        }
        else {
            throw new IllegalArgumentException("Booking not found");
        }
    }
    public BookingDetailRequest createBookingDetail(BookingDetailRequest bookingDetailRequest) {
        Booking_Detail bookingDetail= new Booking_Detail();
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingDetailRequest.getBookingId());
        Optional<Court_timeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){
            bookingDetail.setBooking(bookingOptional.get());
            bookingDetail.setCourt_timeslot(courtTimeslot.get());
            bookingDetail.setDate(bookingDetailRequest.getBookingDate());
            bookingDetail.setDeleted(false);
            bookingDetailRepository.save(bookingDetail);
            return bookingDetailRequest;
        }
        else {
            throw new IllegalArgumentException("Booking or Court_Timeslot not found");
        }
    }
    public BookingDetailRequest updateBookingDetail(BookingDetailRequest bookingDetailRequest,Long bookingDetailId) {
        Optional<Booking_Detail> bookingDetail= bookingDetailRepository.findById(bookingDetailId);
        Optional<Booking> bookingOptional= bookingRepository.findById(bookingDetailRequest.getBookingId());
        Optional<Court_timeslot> courtTimeslot=courtTimeSlotRepository.findById(bookingDetailRequest.getCourtTSId());
        if(bookingDetail.isPresent()){
            if(bookingOptional.isPresent()&&courtTimeslot.isPresent()){
                bookingDetail.get().setBooking(bookingOptional.get());
                bookingDetail.get().setCourt_timeslot(courtTimeslot.get());
                bookingDetailRepository.save(bookingDetail.get());
                return bookingDetailRequest;
            }
            else {
                throw new IllegalArgumentException("Booking or Court_Timeslot not found");
            }
        }
        else{
            throw new IllegalArgumentException("Booking_Detail Id not found");
        }
    }
    public void deleteBookingDetail(Long bookingDetailId) {
        Booking_Detail bookingDetail= (Booking_Detail) bookingDetailRepository.findByDeletedFalseAndBooking_Id(bookingDetailId);
        bookingDetail.setDeleted(true);
        bookingDetailRepository.save(bookingDetail);
    }
}
