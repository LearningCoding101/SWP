package click.badcourt.be.model.response;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;

import java.util.Date;

@Data
public class BookingResponse {

    Long id;
    Date bookingDate;
    String club_name;
    String account_email;
    String account_number;
    BookingStatusEnum status;
    String address;

}
