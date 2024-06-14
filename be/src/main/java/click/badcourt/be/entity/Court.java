package click.badcourt.be.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"bookings"})
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long courtId;
    String courtname;


    @JsonIgnore
    @Column(nullable = false)
    boolean deleted = false;
    @ManyToOne
    @JoinColumn(name = "club_id")
    Club club;

    @OneToMany(mappedBy = "court")

    List<CourtTimeslot> courtTimeslot;



}