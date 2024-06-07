package click.badcourt.be.api;
import click.badcourt.be.entity.TimeSlot;
import click.badcourt.be.model.request.TimeSlotRequest;
import click.badcourt.be.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotApi {

//    @Autowired
//    private TimeSlotService timeSlotService;
//
//    @GetMapping
//    public ResponseEntity<List<TimeSlot>> getAllTimeSlots() {
//        return ResponseEntity.ok(timeSlotService.getALlTimeSlot());
//    }
//
//    @PostMapping
//    public ResponseEntity<TimeSlot> addTimeSlot(@RequestBody TimeSlotRequest request) {
//        TimeSlot createdTimeSlot = timeSlotService.addTimeSlot(request);
//        return ResponseEntity.ok(createdTimeSlot);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<TimeSlot> updateTimeSlot(@PathVariable Long id, @RequestBody TimeSlotRequest request) {
//        TimeSlot updatedTimeSlot = timeSlotService.updateTimeSlot(request,id);
//        return ResponseEntity.ok(updatedTimeSlot);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
//        timeSlotService.deleteTimeSlot(id);
//        return ResponseEntity.noContent().build();
//    }
}

