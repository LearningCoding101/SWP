package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class ChangeSlotBookingDetailRequestCombo {
    private Long newcourtTSId;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date newbookingDate;
}
