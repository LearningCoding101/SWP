package click.badcourt.be.model.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Time;

@Data
public class TimeSlotRequest {
    private int startHour;
    private int startMinute;
    private int endHour;
    private int endMinute;
}
