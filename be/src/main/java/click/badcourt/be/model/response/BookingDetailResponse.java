package click.badcourt.be.model.response;

import click.badcourt.be.enums.BookingDetailStatusEnum;
import click.badcourt.be.model.request.BookingDetailRequest;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class BookingDetailResponse extends BookingDetailRequest {
    private Long bookingDetailsId;
    private String courtName;
    private String fullnameoforder;
    private String phonenumber;
    private LocalTime start_time;
    private LocalTime end_time;
    private BookingDetailStatusEnum status;
}
