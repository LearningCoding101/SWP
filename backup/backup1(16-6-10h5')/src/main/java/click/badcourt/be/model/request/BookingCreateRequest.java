package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class BookingCreateRequest {

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date bookingDate;
    private Long club_id;
    private Long booking_type_id;

}
