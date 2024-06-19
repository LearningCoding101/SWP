package click.badcourt.be.model.response;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingDetailsCustomerResponse {
    private Long bookingDetailsId;
    private String courtName;
    private DayOfWeek dayOfWeek;
    private String phonenumber;
    private String date;
    private LocalTime start_time;
    private LocalTime end_time;
}
