package click.badcourt.be.repository;

import click.badcourt.be.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Transaction findByBooking_BookingId(Long bookingId);
}
