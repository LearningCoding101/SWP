package click.badcourt.be.model.response;

import click.badcourt.be.enums.CourtTSStatusEnum;
import lombok.Data;

import java.time.LocalTime;

@Data
public class CourtTimeSlotResponse {

    private Long courtTimeSlotId;
    private Long timeSlotId;
    private Long CourtId;
    private double price;
    private LocalTime start_time;
    private LocalTime end_time;
    private CourtTSStatusEnum status;

}
