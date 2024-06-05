package click.badcourt.be.model.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Time;

@Data
public class TimeSlotRequest {
    private String start_time;
    private String end_time;

}
