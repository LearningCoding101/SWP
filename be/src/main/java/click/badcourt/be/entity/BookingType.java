package click.badcourt.be.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"booking"})
public class BookingType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingTypeId;
    private float bookingDiscount;
    private String bookingTypeInfo;
    @OneToMany(mappedBy = "bookingType")
    List<Booking> booking;
}
