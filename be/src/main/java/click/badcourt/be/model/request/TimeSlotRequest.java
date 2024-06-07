package click.badcourt.be.model.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Time;
import java.time.LocalTime;

@Data
public class TimeSlotRequest {
    private LocalTime start_time;
    private LocalTime end_time;


}
