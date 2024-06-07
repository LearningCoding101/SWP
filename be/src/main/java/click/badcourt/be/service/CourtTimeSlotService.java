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
//        List<Court_timeslot> courtTimeslots = courtTimeSlotRepository.findCourt_timeslotByDeletedFalseAndCourt_CourtId(courtTimeSlotRequest.getCourtId());
        List<Court_timeslot> courtTimeslots = courtTimeSlotRepository.findAll();
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
//        TimeSlot timeSlotCheck = timeSlotRepository.findTimeSlotsByDeletedFalseAndTimeslot_id(courtTimeSlotRequest.getTimeSlotId());
        Optional<TimeSlot> timeSlotCheck = timeSlotRepository.findById(courtTimeSlotRequest.getTimeSlotId());
//        Court courtCheck = courtRepository.findCourtsByDeletedFalseAndCourtId(courtTimeSlotRequest.getCourtId());
        Optional<Court> courtCheck = courtRepository.findById(courtTimeSlotRequest.getCourtId());
//        if((timeSlotCheck !=null) && (courtCheck !=null)) {
        if((timeSlotCheck.isEmpty()) && (courtCheck.isEmpty())) {
            Court_timeslot court_timeslot = new Court_timeslot();
//            court_timeslot.setTimeslot(timeSlotCheck);
            court_timeslot.setTimeslot(timeSlotCheck.get());
            court_timeslot.setCourt(courtCheck.get());
            court_timeslot.setDeleted(false);
            courtTimeSlotRepository.save(court_timeslot);
            return courtTimeSlotRequest;
        }else {
            throw new IllegalArgumentException("Court or TimeSlot not found");
        }
    }

    public void deleteCourtTimeSlot(long id) {
        Court_timeslot court_timeslot = courtTimeSlotRepository.findById(id).orElseThrow(() -> new RuntimeException("CourtTimeSlot not found!"));
        court_timeslot.setDeleted(true);
        courtTimeSlotRepository.save(court_timeslot);
    }

}

