package click.badcourt.be.model.response;

import click.badcourt.be.model.request.TransactionRequest;
import lombok.Data;

@Data
public class TransactionResponse extends TransactionRequest {

    Long id;
    float depositAmount;

}
