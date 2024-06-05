package click.badcourt.be.model.request;

import click.badcourt.be.enums.TransactionEnum;
import lombok.Data;

import java.util.Date;

@Data
public class TransactionRequest {
    private float depositAmount;
    private Date paymentDate;
    private float totalAmount;
    Long bookingId;
    Long paymentMethodId;
    TransactionEnum status;
}
