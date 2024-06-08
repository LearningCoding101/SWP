package click.badcourt.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Booking_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long bookingDetailsId;

    @ManyToOne
    @JoinColumn(name = "fromBooking")
    Booking booking;

    @ManyToOne
    @JoinColumn(name = "from_court_timeslot")
    Court_timeslot court_timeslot;

    private Date date;

    @Column(nullable = false)
    boolean deleted;
}
