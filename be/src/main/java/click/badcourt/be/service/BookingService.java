package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.FeedBack;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.CourtUpdateRequest;
import click.badcourt.be.model.request.FeedbackCreateRequest;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private AuthenticationRepository authenticationRepository;

    public Booking updateBooking (CourtUpdateRequest courtUpdateRequest, long id){

        Booking booking = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));



        court.setPrice(courtUpdateRequest.getPrice());
        court.setStatus(courtUpdateRequest.getStatus());
        return  courtRepository.save(court);

    }
    public List<BookingResponse> getBookingsByCustomerId(Long customerId) {
        List<Booking> bookingList= bookingRepository.findBookingsByDeletedFalse();
        List<BookingResponse> bookings= new ArrayList<>();
        Optional<Account> account= authenticationRepository.findById(customerId);
        if(account.isPresent()) {
            for (Booking b : bookingList) {

                if (b.getAccount().getAccountId() == account.get().getAccountId()) {
                    BookingResponse bookingResponse = new BookingResponse();
                    bookingResponse.setId(b.getBookingId());
                    bookingResponse.setBookingDate(b.getBookingDate());
                    bookingResponse.setStatus(b.getStatus());
                    bookingResponse.setAccount_email(b.getAccount().getEmail());
                    bookingResponse.setAccount_number(b.getAccount().getPhone());
                    bookingResponse.setClub_name(b.getCourt().getClub().getName());
                    bookings.add(bookingResponse);
                }

            }
            return bookings;
        }else{
            throw new IllegalArgumentException("Account not found");
        }
    }
    public Booking createBooking(BookingCreateRequest bookingCreateRequest) {
        Booking booking = new Booking();
        Optional<Account> account= authenticationRepository.findById(bookingCreateRequest.getCreated_by());
        Optional<Court> court= courtRepository.findById(bookingCreateRequest.getCourt_id());
        if(account.isPresent() && court.isPresent()) {
            booking.setBookingDate(bookingCreateRequest.getBookingDate());
            booking.setAccount(account.get());
            booking.setCourt(court.get());
            booking.setStatus(BookingStatusEnum.PENDING);
            booking.setDeleted(false);

            return bookingRepository.save(booking);
        }
        else{
            throw new IllegalArgumentException("Account or court not found");
        }
    }
    public void deleteBooking(long bookingId){
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setDeleted(true);
        bookingRepository.save(booking);

    }
}
