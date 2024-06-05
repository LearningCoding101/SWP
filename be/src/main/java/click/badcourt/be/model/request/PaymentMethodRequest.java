package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class PaymentMethodRequest {
    private String PaymentMethodName;
    private String PaymentInfo;
}
