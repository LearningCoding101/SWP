package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AuthenticationRepository authenticationRepository;

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }
    public List<Booking> getBookingsByCustomerId(Long customerId) {
        List<Booking> bookings;
        bookings= bookingRepository.findByAccount_AccountId(customerId);
        return bookings;
    }

}
