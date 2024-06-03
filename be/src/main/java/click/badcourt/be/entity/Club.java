package click.badcourt.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Getter
@Setter
@Entity
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long club_id;
    String name;
    String address;
    String open_time;
    String close_time;
    String picture_location;
    @ManyToOne
    @JoinColumn(name = "fromClubOwner")
    Account account;

    @Column(nullable = false)
    boolean deleted;

    @OneToMany(mappedBy = "club")
    List<Court> courts;

}

