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
    private long PaymentMethodId;
    private String PaymentMethodName;
    private String PaymentInfo;
    @OneToOne(mappedBy = "paymentMethod")
    Transaction transaction;
}
