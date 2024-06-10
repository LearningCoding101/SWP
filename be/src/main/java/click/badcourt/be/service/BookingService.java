package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.Court;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
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

    public BookingResponse updateBooking (BookingUpdateRequest bookingUpdateRequest, Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));

        Court court = courtRepository.findById(bookingUpdateRequest.getCourt_id()).orElseThrow(()->new RuntimeException("Court not found"));
        booking.setCourt(court);
        booking.setStatus(bookingUpdateRequest.getBookingStatusEnum());

        booking = bookingRepository.save(booking);

        // Create a new BookingResponse and set the fields
        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setId(booking.getBookingId());
        bookingResponse.setBookingDate(booking.getBookingDate());
        bookingResponse.setClub_name(court.getClub().getName()); // Assuming the Court entity has a reference to Club
        bookingResponse.setAccount_email(booking.getAccount().getEmail()); // Assuming the Account entity has an email field
        bookingResponse.setAccount_number(booking.getAccount().getPhone()); // Assuming the Account entity has an accountNumber field
        bookingResponse.setStatus(booking.getStatus());
        bookingResponse.setAddress(booking.getCourt().getClub().getAddress());
        return bookingResponse;
    }
    public List<BookingResponse> getBookingsByCustomerIdWithResponse(Long customerId) {
        List<Booking> bookingList= bookingRepository.findAll();
        if (!authenticationRepository.existsById(customerId)) {
            throw new IllegalArgumentException("Booking not found with id: " + customerId);
        }

        List<Booking> allBookings = bookingRepository.findAll();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        // Filter the courts by clubId using a for loop
        List<Booking> Bookings = new ArrayList<>();
        for (Booking booking : allBookings) {
            if (booking.getAccount().getAccountId() == customerId) {
                BookingResponse response= new BookingResponse();
                response.setBookingDate(booking.getBookingDate());
                response.setAddress(booking.getCourt().getClub().getAddress());
                response.setId(booking.getBookingId());
                response.setStatus(booking.getStatus());
                response.setClub_name(booking.getCourt().getClub().getName());
                response.setAccount_number(booking.getAccount().getPhone());
                response.setAccount_email(booking.getAccount().getEmail());
                bookingResponses.add(response);
            }
        }
        return bookingResponses;

    }
//    public List<Booking> getBookingsByCustomerId(Long customerId) {
//        List<Booking> bookingList= bookingRepository.findBookingsByDeletedFalse();
//        if (!authenticationRepository.existsById(customerId)) {
//            throw new IllegalArgumentException("Booking not found with id: " + customerId);
//        }
//
//        List<Booking> allBookings = bookingRepository.findBookingsByDeletedFalse();
//
//        // Filter the courts by clubId using a for loop
//        List<Booking> Bookings = new ArrayList<>();
//        for (Booking booking : allBookings) {
//            if (booking.getAccount().getAccountId() == customerId) {
//                Bookings.add(booking);
//            }
//        }
//        return Bookings;
//
//    }

    public Booking createBooking(BookingCreateRequest bookingCreateRequest) {
        Booking booking = new Booking();
        Optional<Account> account= authenticationRepository.findById(bookingCreateRequest.getCreated_by());
        Optional<Court> court= courtRepository.findById(bookingCreateRequest.getCourt_id());
        if(account.isPresent() && court.isPresent()&& !court.get().isDeleted()) {
            booking.setBookingDate(bookingCreateRequest.getBookingDate());
            booking.setAccount(account.get());
            booking.setCourt(court.get());
            booking.setStatus(BookingStatusEnum.PENDING);
//            booking.setDeleted(false);

            return bookingRepository.save(booking);
        }
        else{
            throw new IllegalArgumentException("Account or court not found");
        }
    }

    public void deleteBooking(Long bookingId){
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
//        booking.setDeleted(true);
        bookingRepository.save(booking);

    }
}
