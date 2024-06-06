package click.badcourt.be.service;
import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.repository.CourtTimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourtTimeSlotService {
    @Autowired
    static CourtTimeSlotRepository courtTimeSlotRepository;


    public static Object getCourtTimeSlots(CourtTimeSlotRequest searchRequest) {
        List<Court_timeslot> courtTimeslots = courtTimeSlotRepository.findCourt_timeslotByDeletedFalseAndCourt_CourtId(searchRequest.getCourt().getCourtId());
        List<CourtTimeSlotResponse> CourtTimeSlotSearchResponse = new ArrayList<>();
        for(Court_timeslot court_timeslot : courtTimeslots) {
            CourtTimeSlotResponse courtTimeSlotResponse = new CourtTimeSlotResponse();
            courtTimeSlotResponse.setCourtTimeSlotId(court_timeslot.getCourt_TSlot_ID());
            courtTimeSlotResponse.setTimeslot(court_timeslot.getTimeslot());
            courtTimeSlotResponse.setCourt(court_timeslot.getCourt());
            CourtTimeSlotSearchResponse.add(courtTimeSlotResponse);
        }
        return CourtTimeSlotSearchResponse;
    }

    public static Court_timeslot createCourtTimeSlot(CourtTimeSlotRequest courtTimeSlotCreateRequest) {
        Court_timeslot court_timeslot = new Court_timeslot();
        court_timeslot.setTimeslot(courtTimeSlotCreateRequest.getTimeslot());
        court_timeslot.setCourt(court_timeslot.getCourt());
        court_timeslot.setBookingDetails(court_timeslot.getBookingDetails());
        court_timeslot.setDeleted(false);
        return courtTimeSlotRepository.save(court_timeslot);
    }

    public static void deleteCourtTimeSlot(int id) {
        Court_timeslot court_timeslot = (Court_timeslot) courtTimeSlotRepository.findCourt_timeslotByDeletedFalseAndCourt_CourtId(id);
        court_timeslot.setDeleted(true);
        courtTimeSlotRepository.save(court_timeslot);
    }

}

