package click.badcourt.be.model.request;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;

import java.util.Date;

@Data
public class BookingUpdateRequest {

    private Long club_id;

    private BookingStatusEnum bookingStatusEnum;

}


