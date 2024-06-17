package click.badcourt.be.api;

import click.badcourt.be.entity.BookingType;
import click.badcourt.be.model.request.BookingTypeRequest;
import click.badcourt.be.service.BookingTypeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking-types")
@SecurityRequirement(name = "api")
public class BookingTypeApi {

    @Autowired
    private BookingTypeService bookingTypeService;

    @GetMapping
    public ResponseEntity<List<BookingType>> getAllBookingTypes() {
        return ResponseEntity.ok(bookingTypeService.getAllBookingTypes());
    }

    @PostMapping
    public ResponseEntity<BookingType> addBookingType(@RequestBody BookingTypeRequest bookingTypeRequest) {
        return ResponseEntity.ok(bookingTypeService.add(bookingTypeRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingType> updateBookingType(@RequestBody BookingTypeRequest bookingTypeRequest, @PathVariable Long id) {
        return ResponseEntity.ok(bookingTypeService.update(bookingTypeRequest, id));
    }
}

