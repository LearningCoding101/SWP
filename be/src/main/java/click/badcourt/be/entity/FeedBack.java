package click.badcourt.be.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter

public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedbackId;
    private String feedbackContent;
    private int feedbackRating;
    @OneToOne
    @JoinColumn(name="booking_id")
    Booking booking;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    Account account;
}
