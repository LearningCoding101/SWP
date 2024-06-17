package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class CourtTimeSlotRequest {

    private Long timeSlotId;
    private Long courtId;

}
