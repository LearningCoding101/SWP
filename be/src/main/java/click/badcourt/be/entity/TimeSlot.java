package click.badcourt.be.entity;


import click.badcourt.be.enums.TimeSlotStatusEnum;
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

    private long timeslot_id;
    private Time start_time;
    private Time end_time;
    @Enumerated(EnumType.STRING)
    private TimeSlotStatusEnum status;

    @Column(nullable = false)
    boolean deleted;
    @OneToMany(mappedBy="timeslot")
    List<Court_timeslot> court_timeslots;


}
