package click.badcourt.be.api;

import click.badcourt.be.entity.Court_timeslot;
import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.service.CourtTimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class Court_timeslotApi {
    @Autowired
    CourtTimeSlotService courtTimeSlotService;

    @GetMapping("court-timeslot")
    public ResponseEntity getAllCourtTimeslots(@RequestBody CourtTimeSlotRequest courtTimeSlotRequest) {
        return ResponseEntity.ok(CourtTimeSlotService.getCourtTimeSlots(courtTimeSlotRequest));
    }

    @PostMapping("court-timeslot")
    public ResponseEntity createCourtTimeslot(@RequestBody CourtTimeSlotRequest courtTimeSlotRequest) {
        try{
            Court_timeslot createCourtTimeslot = CourtTimeSlotService.createCourtTimeSlot(courtTimeSlotRequest);
            return new ResponseEntity<>(createCourtTimeslot, HttpStatus.CREATED);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("court-timeslot/{id}")
    public ResponseEntity deleteCourtTimeslot(@PathVariable int id){
        CourtTimeSlotService.deleteCourtTimeSlot(id);
        return ResponseEntity.ok( "Courst time slot  :"+id +" is deleted");
    }
}
