package click.badcourt.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentMethodId;
    private String paymentMethodName;
    private String paymentInfo;
    @OneToOne(mappedBy = "paymentMethod")
    Transaction transaction;

}
