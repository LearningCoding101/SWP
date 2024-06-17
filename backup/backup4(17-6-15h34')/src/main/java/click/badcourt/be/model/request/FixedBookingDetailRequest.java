package click.badcourt.be.model.request;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
public class FixedBookingDetailRequest {

    private LocalDate startDate;
    private Long bookingId;
    private Long courtTSId;
    private int durationInMonths;
    private DayOfWeek dayOfWeek;
}
