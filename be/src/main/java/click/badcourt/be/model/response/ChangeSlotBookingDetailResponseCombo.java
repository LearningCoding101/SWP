package click.badcourt.be.model.response;

import click.badcourt.be.enums.BookingDetailStatusEnum;
import click.badcourt.be.model.request.ChangeSlotBookingDetailRequestCombo;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.util.Date;

@Data
public class ChangeSlotBookingDetailResponseCombo extends ChangeSlotBookingDetailRequestCombo {

    private Long bookingId;

    private String courtName;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date bookingDate;
    private LocalTime start_time;
    private LocalTime end_time;
    private Long courtTSId;
    private Long timeslotId;
    private BookingDetailStatusEnum status;

    private String newcourtName;
    private LocalTime newstart_time;
    private LocalTime newend_time;
    private Long newtimeslotId;


    private String fullnameoforder;
    private String phonenumber;

}
