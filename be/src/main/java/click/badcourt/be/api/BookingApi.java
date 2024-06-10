package click.badcourt.be.api;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@SecurityRequirement(name = "api")
public class BookingApi {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
        Booking booking = bookingService.createBooking(bookingCreateRequest);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@RequestBody BookingUpdateRequest bookingUpdateRequest, @PathVariable long id) {
        try {
            BookingResponse bookingResponse = bookingService.updateBooking(bookingUpdateRequest, id);
            return ResponseEntity.ok(bookingResponse);
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getBookingsByCustomerId(@PathVariable Long customerId) {
        try {
            List<BookingResponse> bookings = bookingService.getBookingsByCustomerIdWithResponse(customerId);
            return ResponseEntity.ok(bookings);
        }catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
    }

//    @DeleteMapping("/{bookingId}")
//    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
//        bookingService.deleteBooking(bookingId);
//        return ResponseEntity.noContent().build();
//    }
}
