package click.badcourt.be.entity;

import click.badcourt.be.enums.CourtTSStatusEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"court","timeslot","bookingDetails"})
public class CourtTimeslot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long courtTSlotID;

    @ManyToOne
    @JoinColumn(name="from_timeSlot")

    TimeSlot timeslot;


    @ManyToOne
    @JoinColumn(name="from_Court")

    Court court;

    @OneToMany(mappedBy = "courtTimeslot")
    List<BookingDetail> bookingDetails;

    @Column(nullable = false)
    boolean deleted;
}
