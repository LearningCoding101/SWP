package click.badcourt.be.repository;

import click.badcourt.be.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRespository extends JpaRepository<FeedBack, Long> {
    List<FeedBack> findFeedBacksByIsDeletedFalse();
    FeedBack findByBooking_BookingId(Long bookingId);
}
