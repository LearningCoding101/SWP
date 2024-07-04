package click.badcourt.be.repository;

import click.badcourt.be.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByBooking_BookingId(Long bookingId);

    @Query("SELECT MONTH(t.paymentDate), SUM(t.totalAmount) " +
            "FROM Transaction t " +
            "WHERE YEAR(t.paymentDate) = ?1 " +
            "GROUP BY MONTH(t.paymentDate)")
    List<Object[]> getTotalAmountByMonth(int year);

    @Query("SELECT MONTH(t.paymentDate), SUM(t.totalAmount) " +
            "FROM Transaction t " +
            "WHERE YEAR(t.paymentDate) = ?1 AND t.booking.club.clubId = ?2 " +
            "GROUP BY MONTH(t.paymentDate)")
    List<Object[]> getTotalAmountByMonthForClub(int year, Long clubId);
}
