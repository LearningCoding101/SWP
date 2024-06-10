package click.badcourt.be.entity;

import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.RoleEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"feedback", "transaction"})
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Date bookingDate;

    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;

//    @Column(nullable = false)
//    private boolean deleted ;

    @OneToOne(mappedBy = "booking")
    FeedBack feedback;

    @OneToOne(mappedBy = "booking")
    Transaction transaction;

    @OneToMany(mappedBy = "booking")

    List<Booking_Detail> bookingDetails;

    @ManyToOne
    @JoinColumn(name = "create_by")
    @JsonBackReference
    Account account;

    @Enumerated(EnumType.STRING)
    BookingStatusEnum status;
}

