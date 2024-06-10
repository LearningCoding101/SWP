package click.badcourt.be.service;

import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.CourtTimeslot;
import click.badcourt.be.entity.TimeSlot;
import click.badcourt.be.enums.CourtTSStatusEnum;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.repository.CourtRepository;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import click.badcourt.be.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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

    public List<CourtTimeSlotResponse> getCourtTimeSlotsByCourtIdAndDate(Long id, Date date) {
        List<CourtTimeslot> courtTimeslots = courtTimeSlotRepository.findCourtTimeslotByByDeletedFalseAndCourt_CourtId(id);
        List<CourtTimeSlotResponse> CourtTimeSlotResponses = new ArrayList<>();
        for(CourtTimeslot court_timeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(court_timeslot.getCourtTSlotID());
            courtTimeSlotResponse.setCourtId(court_timeslot.getCourt().getCourtId());
            courtTimeSlotResponse.setTimeSlotId(court_timeslot.getTimeslot().getTimeslotId());
            courtTimeSlotResponse.setPrice(court_timeslot.getCourt().getPrice());
            courtTimeSlotResponse.setStart_time(court_timeslot.getTimeslot().getStart_time());
            courtTimeSlotResponse.setEnd_time(court_timeslot.getTimeslot().getEnd_time());
            if(){
                courtTimeSlotResponse.setStatus(CourtTSStatusEnum.IN_USE);
            }
            else {
                courtTimeSlotResponse.setStatus(CourtTSStatusEnum.AVAILABLE);
            }

            CourtTimeSlotResponses.add(courtTimeSlotResponse);
        }
        return CourtTimeSlotResponses;
    }

    public CourtTimeSlotRequest createCourtTimeSlot(CourtTimeSlotRequest courtTimeSlotRequest) {
        Optional<TimeSlot> timeSlotCheck = timeSlotRepository.findTimeSlotByDeletedFalseAndTimeslotId(courtTimeSlotRequest.getTimeSlotId());
        Optional<Court> courtCheck = courtRepository.findCourtByDeletedFalseAndCourtId(courtTimeSlotRequest.getCourtId());

        if((timeSlotCheck.isPresent()) && (courtCheck.isPresent())) {
            CourtTimeslot court_timeslot = new CourtTimeslot();
            court_timeslot.setTimeslot(timeSlotCheck.get());
            court_timeslot.setCourt(courtCheck.get());
            court_timeslot.setDeleted(false);
            court_timeslot.setStatus(CourtTSStatusEnum.AVAILABLE);
            courtTimeSlotRepository.save(court_timeslot);
            return courtTimeSlotRequest;
        }else {
            throw new IllegalArgumentException("Court or TimeSlot not found");
        }
    }

    public void deleteCourtTimeSlot(Long id) {
        CourtTimeslot courtTimeslot = courtTimeSlotRepository.findById(id).orElseThrow(() -> new RuntimeException("CourtTimeSlot not found!"));
        courtTimeslot.setDeleted(true);
        courtTimeSlotRepository.save(courtTimeslot);
    }

}

