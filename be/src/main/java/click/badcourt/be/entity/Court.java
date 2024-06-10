package click.badcourt.be.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"court_timeslots", "bookings"})
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long courtId;

    double price;

    @JsonIgnore
    @Column(nullable = false)
    boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "club_id")
    Club club;

    @OneToMany(mappedBy = "court")
    List<CourtTimeslot> courtTimeslot;

    @OneToMany(mappedBy = "court")
    List<Booking> bookings;

}