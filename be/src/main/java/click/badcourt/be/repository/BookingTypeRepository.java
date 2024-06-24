package click.badcourt.be.repository;

import click.badcourt.be.entity.BookingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingTypeRepository extends JpaRepository<BookingType, Long> {
    BookingType findBookingTypeByBookingTypeId(Long bookingTypeId);
}
