package click.badcourt.be.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Entity
@Getter
@Setter
public class Booking_Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long bookingDetails_Id;
    @ManyToOne
    @JoinColumn(name = "fromBooking")
    Booking booking;
    @ManyToOne
    @JoinColumn(name = "from_court_timeslot")
    Court_timeslot court_timeslot;
    private Time date;
}
