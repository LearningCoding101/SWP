package com.badminton.greetingdemo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingID", nullable = false, length=10)
    private String bookingID;
    @Column(name = "bookingdate")
    private Date bookingDate;
    @Column(name = "Status", nullable = false, length=10)
    private String status;
    @Column(name = "CourtID", nullable = false, length=10)
    private String courtID;
    @Column(name = "StaffID", nullable = false, length=10)
    private String staffID;
    @Column(name = "CustomerID", nullable = false, length=10)
    private String customerID;

    public Booking() {
    }
}
