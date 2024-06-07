package click.badcourt.be.api;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingApi {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
        Booking booking = bookingService.createBooking(bookingCreateRequest);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponse> updateBooking(@RequestBody BookingUpdateRequest bookingUpdateRequest, @PathVariable long id) {
        BookingResponse bookingResponse = bookingService.updateBooking(bookingUpdateRequest, id);
        return ResponseEntity.ok(bookingResponse);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByCustomerId(@PathVariable Long customerId) {
        List<BookingResponse> bookings = bookingService.getBookingsByCustomerId(customerId);
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.noContent().build();
    }
}
