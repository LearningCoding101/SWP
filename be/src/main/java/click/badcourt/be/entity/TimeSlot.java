package click.badcourt.be.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Entity
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long timeslot_id;
    private LocalTime start_time;
    private LocalTime end_time;

    @Column(nullable = false)
    boolean deleted;
    @OneToMany(mappedBy="timeslot")
    List<Court_timeslot> court_timeslots;

}
