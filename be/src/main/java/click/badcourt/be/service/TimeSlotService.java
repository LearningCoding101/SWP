package click.badcourt.be.service;

import click.badcourt.be.entity.TimeSlot;
import click.badcourt.be.model.request.TimeSlotRequest;
import click.badcourt.be.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotService {
    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public List<TimeSlot> getALlTimeSlot() {
        return timeSlotRepository.findTimeSlotsByDeletedFalse();
    }

    public TimeSlot addTimeSlot(TimeSlotRequest timeSlot) {
        TimeSlot slot = new TimeSlot();
        slot.setStart_time(timeSlot.getStart_time());
        slot.setEnd_time(timeSlot.getEnd_time());
        slot.setDeleted(false);
        return timeSlotRepository.save(slot);
    }

    public TimeSlot updateTimeSlot(TimeSlotRequest timeSlot,Long id) {
        TimeSlot slot = timeSlotRepository.findById(id).orElseThrow(() -> new RuntimeException("Timeslot not found"));
        slot.setStart_time(timeSlot.getStart_time());
        slot.setEnd_time(timeSlot.getEnd_time());
        return timeSlotRepository.save(slot);
    }

    public void deleteTimeSlot(Long id) {
        TimeSlot slot = timeSlotRepository.findById(id).orElseThrow(() -> new RuntimeException("Timeslot not found"));
        slot.setDeleted(true);
        timeSlotRepository.save(slot);
    }
}
