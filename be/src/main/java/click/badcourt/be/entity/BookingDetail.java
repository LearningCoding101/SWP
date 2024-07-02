package click.badcourt.be.entity;

import click.badcourt.be.enums.BookingDetailStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Getter
@Setter
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long bookingDetailsId;

    @ManyToOne
    @JoinColumn(name = "fromBooking")
    Booking booking;


    @ManyToOne
    @JoinColumn(name = "from_courtTimeslot")
    CourtTimeslot courtTimeslot;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @Column(nullable = false)
    boolean deleted;
    @Enumerated(EnumType.STRING)
    BookingDetailStatusEnum detailStatus=BookingDetailStatusEnum.NOTYET;
}
