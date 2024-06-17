package click.badcourt.be.model.request;

import lombok.Data;

import java.util.Date;

@Data
public class CourtTimeSlotSearchRequest {
    private Long courtTSId;
    private Long courtId;
    private Date date;
}
