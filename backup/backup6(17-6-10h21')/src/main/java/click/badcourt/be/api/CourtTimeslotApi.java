package click.badcourt.be.api;

import click.badcourt.be.model.request.CourtTimeSlotRequest;
import click.badcourt.be.model.response.CourtTimeSlotResponse;
import click.badcourt.be.service.CourtTimeSlotService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/courtTimeSlot")
@SecurityRequirement(name = "api")
public class CourtTimeslotApi {
    @Autowired
    CourtTimeSlotService courtTimeSlotService;

//    @PreAuthorize("hasAuthority('STAFF' OR 'CUSTOMER' OR 'ClUB_OWNER')")
    @GetMapping("/{cId}/{date}")
    public List<CourtTimeSlotResponse> getCourtTimeSlotsByCourtIdAndDate(
            @PathVariable Long cId,
            @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        return courtTimeSlotService.getCourtTimeSlotsByCourtIdAndDate(cId, date);
    }



    //    @PreAuthorize("hasAuthority('CLUB_OWNER')")
    @PostMapping()
    public ResponseEntity createCourtTimeslot(@RequestBody CourtTimeSlotRequest courtTimeSlotRequest) {
        try{
            CourtTimeSlotRequest createCourtTimeslot = courtTimeSlotService.createCourtTimeSlot(courtTimeSlotRequest);
            return new ResponseEntity<>(createCourtTimeslot, HttpStatus.CREATED);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @PreAuthorize("hasAuthority('CLUB_OWNER')")
    @DeleteMapping("/{Id}")
    public ResponseEntity deleteCourtTimeslot(@PathVariable Long Id){
        courtTimeSlotService.deleteCourtTimeSlot(Id);
        return ResponseEntity.ok( "Courst time slot  :"+Id +" is deleted");
    }
}
