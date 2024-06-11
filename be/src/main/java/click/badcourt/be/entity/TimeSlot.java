package click.badcourt.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"courtTimeslots"})
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timeslotId;

    private LocalTime start_time;
    private LocalTime end_time;

    @Column(nullable = false)
    boolean deleted;



    @OneToMany(mappedBy="timeslot")

    List<CourtTimeslot> courtTimeslots;
}
