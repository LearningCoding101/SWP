package click.badcourt.be.repository;

import click.badcourt.be.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail,Long> {
    //    @Query("SELECT bd FROM BookingDetail bd WHERE bd.date >= :startDate AND bd.date <= :endDate AND bd.deleted = false")
    //    List<BookingDetail> findBookingDetailsByDateRangeAndDeletedFalse(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    //    @Query("SELECT bd FROM BookingDetail bd WHERE bd.date = :date AND bd.deleted = false")
    //    List<BookingDetail> findBookingDetailsByDateAndDeletedFalse(@Param("date") Date date);
    List<BookingDetail> findBookingDetailsByBooking_BookingId(Long bookingId);
    List<BookingDetail> findBookingDetailsByDeletedFalse();
    List<BookingDetail> findBookingDetailsByDeletedTrueAndCourtTimeslot_CourtTSlotID(Long courtTSlotID);

}
