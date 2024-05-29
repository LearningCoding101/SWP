package com.example.BadCourts.service.impl;


import com.example.BadCourts.repository.*;
import com.example.BadCourts.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(String bookingID) {
        return bookingRepository.findById(bookingID);
    }

    public Booking updateBooking(String bookingID, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingDate((bookingDetails.getBookingDate()));
        booking.setStatus(bookingDetails.getStatus());
        booking.setCourtID(bookingDetails.getCourtID());
        booking.setStaffID(bookingDetails.getStaffID());
        booking.setCustomerID(bookingDetails.getCustomerID());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(String bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow(() -> new RuntimeException("Booking not found"));
        bookingRepository.delete(booking);
    }
    public List<Booking> getBookingsByCustomerID(String customerID) {
        return bookingRepository.findByCustomerID(customerID);
    }

}

