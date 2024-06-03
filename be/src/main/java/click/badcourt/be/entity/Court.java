package click.badcourt.be.entity;

import click.badcourt.be.enums.CourtStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Court {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courtId;
    private double price;
    private CourtStatusEnum status;


    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;


    @OneToMany(mappedBy = "court")
    private List<Booking> bookings;

}
