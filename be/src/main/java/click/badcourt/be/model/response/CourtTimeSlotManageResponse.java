package click.badcourt.be.model.response;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CourtTimeSlotManageResponse {

    private Long courtTimeSlotId;
    private Long timeSlotId;
    private Long CourtId;
    private double price;
    private LocalTime start_time;
    private LocalTime end_time;

}
