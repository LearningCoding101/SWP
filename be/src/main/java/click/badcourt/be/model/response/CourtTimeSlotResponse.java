package click.badcourt.be.model.response;

import click.badcourt.be.entity.Booking_Detail;
import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.TimeSlot;
import lombok.Data;

@Data
public class CourtTimeSlotResponse {
//    long CourtTimeSlotId;
//    TimeSlot timeslot;
//    Court court;
//    boolean deleted;
    long CourtTimeSlotId;
    long TimeSlotId;
    long CourtId;
}
