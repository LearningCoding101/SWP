package click.badcourt.be.entity;

import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.RoleEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private Date bookingDate;
    @ManyToOne
    @JoinColumn(name = "court_id")

    private Court court;
    @Column(nullable = false)
    private boolean deleted ;
    @OneToOne(mappedBy = "booking")
    FeedBack feedback;
    @OneToOne(mappedBy = "booking")
    Transaction transaction;
    @ManyToOne
    @JoinColumn(name = "create_by")
    Account account;

    @Enumerated(EnumType.STRING)
    BookingStatusEnum status;
}

