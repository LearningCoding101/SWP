package click.badcourt.be.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class BookingType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingTypeId;
    private float bookingDiscount;

    @OneToMany(mappedBy = "bookingType")
    List<Booking> booking;
}
