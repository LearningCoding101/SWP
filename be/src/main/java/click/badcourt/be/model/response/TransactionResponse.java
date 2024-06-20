package click.badcourt.be.model.response;

import click.badcourt.be.model.request.TransactionRequest;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TransactionResponse {

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date paymentDate;
    private Double totalAmount;
    Long bookingId;
    String paymentMethod;
    String status;
    Long id;
    float depositAmount;

}
