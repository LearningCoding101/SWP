package click.badcourt.be.model.request;

import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.TimeSlot;
import lombok.Data;

@Data
public class CourtTimeSlotRequest {
//    TimeSlot timeslot;
//    Court court;

    long TimeSlotId;
    long CourtId;
}
