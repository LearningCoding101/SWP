package click.badcourt.be.repository;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.enums.BookingStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findBookingsByClub_ClubId(Long clubID);


    List<Booking> findAllByAccount_AccountId(Long accountId);
    List<Booking> findByStatusAndBookingDateBefore(BookingStatusEnum status, Date date);
}
