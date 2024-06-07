package click.badcourt.be.repository;

import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CourtTimeSlotRepository extends JpaRepository<Court_timeslot, Long> {
    List<Court_timeslot> findCourt_timeslotByDeletedFalseAndCourt_id(long court_id);

    List<Court_timeslot> findCourt_timeslotByDeletedFalseAndCourt_CourtId(long court_id);

    List<TimeSlot> findTimeSlotsByDeletedFalseAndAndTimeslot_id(Long timeSlot_id);

}
