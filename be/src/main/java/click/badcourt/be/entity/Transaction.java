package click.badcourt.be.entity;

import click.badcourt.be.enums.TransactionEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private float depositAmount;
    private Date paymentDate;
    private float totalAmount;

    @OneToOne
    @JoinColumn(name="booking_id")
    Booking booking;

    @OneToOne
    @JoinColumn(name="payment_method_id")
    PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    TransactionEnum status;
}
