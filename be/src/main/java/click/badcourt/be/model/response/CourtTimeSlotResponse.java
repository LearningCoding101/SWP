package click.badcourt.be.model.response;

import click.badcourt.be.enums.CourtTSStatusEnum;
import lombok.Data;

import java.time.LocalTime;

@Data
public class CourtTimeSlotResponse {

    long CourtTimeSlotId;
    long TimeSlotId;
    long CourtId;
    double price;
    LocalTime start_time;
    LocalTime end_time;
    CourtTSStatusEnum status;

}
