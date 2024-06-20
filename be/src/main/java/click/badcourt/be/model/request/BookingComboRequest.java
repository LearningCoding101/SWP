package click.badcourt.be.model.request;

import lombok.Data;
import java.util.List;

@Data
public class BookingComboRequest {
    private Long club_id;
    private Long booking_type_id;
    List<BookingDetailRequestCombo> bookingDetailRequestCombos;
}
