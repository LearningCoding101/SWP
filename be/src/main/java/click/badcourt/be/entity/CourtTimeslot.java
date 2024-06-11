package click.badcourt.be.entity;

import click.badcourt.be.enums.CourtTSStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class CourtTimeslot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long courtTSlotID;

    @ManyToOne
    @JoinColumn(name="from_timeSlot")
    TimeSlot timeslot;

    @Enumerated(EnumType.STRING)
    CourtTSStatusEnum status = CourtTSStatusEnum.AVAILABLE;

    @ManyToOne
    @JoinColumn(name="from_Court")
    Court court;

    @OneToMany(mappedBy = "courtTimeslot")
    List<BookingDetail> bookingDetails;

    @Column(nullable = false)
    boolean deleted;
}
