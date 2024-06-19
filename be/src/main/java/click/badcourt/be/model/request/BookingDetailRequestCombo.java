package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class BookingDetailRequestCombo {
    private Long courtTSId;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date bookingDate;
}
