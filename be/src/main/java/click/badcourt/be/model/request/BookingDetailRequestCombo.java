package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Date;

@Data
public class BookingDetailRequestCombo {
    private Long courtTSId;
    private LocalDate bookingDate;

    private int durationInMonths;

    private DayOfWeek dayOfWeek;
}
