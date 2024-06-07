package click.badcourt.be.entity;

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
    long CourtTSlotID;

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
