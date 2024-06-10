package click.badcourt.be.repository;

import click.badcourt.be.entity.Booking_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<Booking_Detail,Long> {

    List<Booking_Detail> findBooking_DetailsByBooking_BookingId(Long bookingId);
    Booking_Detail findBooking_DetailByDeletedTrueAndCourtTimeslot_CourtTSlotID(Integer courtTimeslotID, Integer courtTSlotID);

}
