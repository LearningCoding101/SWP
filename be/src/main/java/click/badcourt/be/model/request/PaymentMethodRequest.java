package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class PaymentMethodRequest {

    private String paymentMethodName;
    private String paymentInfo;

}
