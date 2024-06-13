package click.badcourt.be.api;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.EmailDetail;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
import click.badcourt.be.model.request.QRCodeData;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.service.BookingService;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public ResponseEntity<?> updateBooking(@RequestBody BookingUpdateRequest bookingUpdateRequest, @PathVariable Long id) {
        try {
            BookingResponse bookingResponse = bookingService.updateBooking(bookingUpdateRequest, id);
            return ResponseEntity.ok(bookingResponse);
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer")
    public ResponseEntity<?> getBookingsByCustomerId() {
        try {
            List<BookingResponse> bookings = bookingService.getBookingsByCustomerIdWithResponse();
            return ResponseEntity.ok(bookings);
        }catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
    }
    @PostMapping("/confirm")
    public String confirmBooking(@RequestBody QRCodeData data) {
        try {
            bookingService.sendBookingConfirmation(data);
            return "Booking confirmation sent!";
        } catch (WriterException | IOException | MessagingException e) {
            e.printStackTrace();
            return "Failed to send booking confirmation.";
        }
    }

    @PostMapping("/checkin")
    public String checkIn(@RequestParam byte[] qrCodeData, @RequestBody QRCodeData expectedData) {
        try {
            boolean isValid = bookingService.validateQrCode(qrCodeData, expectedData);
            return isValid ? "Check-in successful!" : "Invalid QR code.";
        } catch (IOException | NotFoundException e) {   
            e.printStackTrace();
            return "Failed to validate QR code.";
        }
    }


//    @DeleteMapping("/{bookingId}")
//    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
//        bookingService.deleteBooking(bookingId);
//        return ResponseEntity.noContent().build();
//    }
}
