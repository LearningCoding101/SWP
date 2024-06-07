package click.badcourt.be.repository;

import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CourtTimeSlotRepository extends JpaRepository<Court_timeslot, Long> {

    List<Court_timeslot> findCourt_timeslotsByDeletedFalseAndCourt_CourtId(Long courtId);

}
