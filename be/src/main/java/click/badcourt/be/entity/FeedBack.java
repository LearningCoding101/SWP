package click.badcourt.be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FeedBack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String feedbackContent;

    private int feedbackRating;

    @OneToOne
    @JoinColumn(name="booking_id")
    Booking booking;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "customer_id")
    Account account;

    boolean isDeleted;
}
