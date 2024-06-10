package click.badcourt.be.model.request;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;

import java.util.Date;

@Data
public class BookingUpdateRequest {

    private Long court_id;

    private BookingStatusEnum bookingStatusEnum;

}


