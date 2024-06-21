package click.badcourt.be.model.request;

import click.badcourt.be.enums.TransactionEnum;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TransactionRequest {

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date paymentDate;
    Long bookingId;
    String status;

}
