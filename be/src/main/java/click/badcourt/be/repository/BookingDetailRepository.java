package click.badcourt.be.repository;

import click.badcourt.be.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail,Long> {

    List<BookingDetail> findBookingDetailsByBooking_BookingId(Long bookingId);
    List<BookingDetail> findBookingDetailsByDeletedTrueAndCourtTimeslot_CourtTSlotID(Long courtTSlotID);

}
