package click.badcourt.be.api;

import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.service.CourtTimeSlotService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courtTimeSlot")
@SecurityRequirement(name = "api")
public class CourtTimeslotApi {

    @Autowired
    CourtTimeSlotService courtTimeSlotService;

    @GetMapping("/{courtId}")
    public ResponseEntity getAllCourtTimeslotsByCourtId(@PathVariable Long courtId) {
        return ResponseEntity.ok(courtTimeSlotService.getCourtTimeSlotsByCourtId(courtId));
    }

    @PostMapping()
    public ResponseEntity createCourtTimeslot(@RequestBody CourtTimeSlotRequest courtTimeSlotRequest) {
        try{
            CourtTimeSlotRequest createCourtTimeslot = courtTimeSlotService.createCourtTimeSlot(courtTimeSlotRequest);
            return new ResponseEntity<>(createCourtTimeslot, HttpStatus.CREATED);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity deleteCourtTimeslot(@PathVariable Long Id){
        courtTimeSlotService.deleteCourtTimeSlot(Id);
        return ResponseEntity.ok( "Courst time slot  :"+Id +" is deleted");
    }
}
