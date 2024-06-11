package click.badcourt.be.model.request;

import lombok.Data;

import java.util.Date;

@Data
public class BookingDetailRequest {

    Long bookingId;
    Long courtTSId;
    Date bookingDate;

}
