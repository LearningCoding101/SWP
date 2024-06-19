package click.badcourt.be.model.response;

import click.badcourt.be.model.request.BookingDetailRequest;
import lombok.Data;

import java.util.List;

@Data
public class BookingComboResponse {
    BookingResponse bookingResponse;
    List<BookingDetailRequest> bookingDetailRequestList;
}
