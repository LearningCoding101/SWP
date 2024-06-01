package click.badcourt.be.entity;

import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "create_by")
    Account account;

    @Enumerated(EnumType.STRING)
    BookingStatusEnum status;
}

