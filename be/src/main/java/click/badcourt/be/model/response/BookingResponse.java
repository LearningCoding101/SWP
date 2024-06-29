package click.badcourt.be.model.response;

import click.badcourt.be.entity.BookingType;
import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class BookingResponse {

    Long id;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    Date bookingDate;
    String club_name;
    String account_email;
    private String account_number;
    double price;
    BookingStatusEnum status;
    Long bookingTypeId;
    String address;
    Long clubId;
}
