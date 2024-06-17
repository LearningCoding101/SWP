package click.badcourt.be.repository;

import click.badcourt.be.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    List<TimeSlot> findByDeletedFalse();

    Optional<TimeSlot> findTimeSlotByDeletedFalseAndTimeslotId(Long id);
}
