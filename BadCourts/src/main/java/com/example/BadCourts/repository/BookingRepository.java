package com.badminton.greetingdemo.respository;

import com.badminton.greetingdemo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByCustomerID(String customerID);
}

