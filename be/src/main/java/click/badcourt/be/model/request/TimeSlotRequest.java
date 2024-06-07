package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class TimeSlotRequest {
    private int startHour;
    private int startMinute;
    private int endHour;
    private int endMinute;
}
