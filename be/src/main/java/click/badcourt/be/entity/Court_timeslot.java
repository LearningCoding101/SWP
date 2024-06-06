package click.badcourt.be.entity;

import click.badcourt.be.model.response.CourtTimeSlotResponse;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Court_timeslot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long Court_TSlot_ID;
    @ManyToOne
    @JoinColumn(name="from_timeSlot")
     TimeSlot timeslot;
    @ManyToOne
    @JoinColumn(name="from_Court")
     Court court;
    @OneToMany(mappedBy = "court_timeslot")
    List<Booking_Detail> bookingDetails;
    @Column(nullable = false)
    boolean deleted;

}
