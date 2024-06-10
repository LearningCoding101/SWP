package click.badcourt.be.model.request;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalTime;
import java.util.Date;

@Data
public class BookingCreateRequest {

    private Date bookingDate;
    private Long court_id;
    private Long created_by;
    private BookingStatusEnum bookingStatusEnum;

}
