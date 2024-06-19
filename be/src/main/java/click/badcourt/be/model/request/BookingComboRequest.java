package click.badcourt.be.model.request;

import lombok.Data;
import java.util.List;

@Data
public class BookingComboRequest {
    BookingCreateRequest bookingCreateRequest;
    List<BookingDetailRequestCombo> bookingDetailRequestCombos;
}
