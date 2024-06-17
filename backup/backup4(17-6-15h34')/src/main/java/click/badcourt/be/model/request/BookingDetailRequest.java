package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

@Data
public class BookingDetailRequest {

    private Long bookingId;
    private Long courtTSId;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date bookingDate;
//    private SimpleDateFormat bookingDate = new SimpleDateFormat("yyyy-MM-dd");

}
