package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class CourtTimeSlotRequest {
    long TimeSlotId;
    long CourtId;
}
