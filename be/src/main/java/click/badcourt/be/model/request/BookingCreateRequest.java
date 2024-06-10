package click.badcourt.be.model.request;

import click.badcourt.be.enums.BookingStatusEnum;
import lombok.Data;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.util.Date;

@Data
public class BookingCreateRequest {

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date bookingDate;
    private Long court_id;
    private Long created_by;
    private BookingStatusEnum bookingStatusEnum;

}
