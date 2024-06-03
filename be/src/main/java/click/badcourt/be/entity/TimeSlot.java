package click.badcourt.be.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Getter
@Setter
@Entity
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long timeslot_id;
    Time start_time;
    Time end_time;
    @OneToMany(mappedBy="timeslot")
     List<Court_timeslot> court_timeslots;

}
