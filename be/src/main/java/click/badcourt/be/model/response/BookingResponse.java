package click.badcourt.be.model.response;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class BookingResponse {

    long id;
    Date BookingDate;
    String club_name;
    String account_email;
    String account_number;
    BookingStatusEnum status;
    String address;

}
