package click.badcourt.be.service;
import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.entity.TimeSlot;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.repository.CourtRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import click.badcourt.be.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourtTimeSlotService {
    @Autowired
    CourtTimeSlotRepository courtTimeSlotRepository;

    @Autowired
    TimeSlotRepository timeSlotRepository;

    @Autowired
    CourtRepository courtRepository;

    public Object getCourtTimeSlots(CourtTimeSlotRequest courtTimeSlotRequest) {
        List<Court_timeslot> courtTimeslots = courtTimeSlotRepository.findCourt_timeslotByDeletedFalseAndCourt_id(courtTimeSlotRequest.getCourtId());
        List<CourtTimeSlotResponse> CourtTimeSlotResponses = new ArrayList<>();
        for(Court_timeslot court_timeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(court_timeslot.getCourt_TSlot_ID());
            courtTimeSlotResponse.setTimeSlotId((courtTimeSlotRequest.getTimeSlotId()));
            CourtTimeSlotResponses.add(courtTimeSlotResponse);
        }
        return CourtTimeSlotResponses;
    }

    public CourtTimeSlotRequest createCourtTimeSlot(CourtTimeSlotRequest courtTimeSlotRequest) {
        Optional<TimeSlot> timeSlotCheck = timeSlotRepository.findTimeSlotByDeletedFalseAndTimeslot_id(courtTimeSlotRequest.getTimeSlotId());
        Optional<Court> courtCheck = courtRepository.findCourtsByDeletedFalseAndCourtId(courtTimeSlotRequest.getCourtId());
        if(timeSlotCheck.isPresent() && courtCheck.isPresent()) {
            Court_timeslot court_timeslot = new Court_timeslot();
            court_timeslot.setTimeslot(timeSlotCheck.get());
            court_timeslot.setCourt(court_timeslot.getCourt());
            court_timeslot.setDeleted(false);
            courtTimeSlotRepository.save(court_timeslot);
            return courtTimeSlotRequest;
        }else {
            throw new IllegalArgumentException("Court or TimeSlot not found");
        }
    }

    public void deleteCourtTimeSlot(int id) {
        Court_timeslot court_timeslot = (Court_timeslot) courtTimeSlotRepository.findCourt_timeslotByDeletedFalseAndCourt_id(id);
        court_timeslot.setDeleted(true);
        courtTimeSlotRepository.save(court_timeslot);
    }

}

