package click.badcourt.be.repository;

import click.badcourt.be.entity.CourtTimeslot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CourtTimeSlotRepository extends JpaRepository<CourtTimeslot, Long> {

    List<CourtTimeslot> findCourtTimeslotByByDeletedFalseAndCourt_CourtId(Long courtId);

}
