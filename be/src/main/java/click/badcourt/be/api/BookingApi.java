package click.badcourt.be.api;

import click.badcourt.be.model.request.*;
import click.badcourt.be.model.response.BookingComboResponse;
import click.badcourt.be.model.response.BookingDetailResponse;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.service.BookingDetailService;
import click.badcourt.be.service.BookingService;
import click.badcourt.be.service.EmailService;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@SecurityRequirement(name = "api")
@CrossOrigin("*")
public class BookingApi {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private BookingDetailService bookingDetailService;
    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
        BookingResponse booking = bookingService.createBooking(bookingCreateRequest);
        return ResponseEntity.ok(booking);
    }
    @GetMapping("/countByClubOwner")
    public ResponseEntity<?> countBookingsByClubOwner() {
        try {
            long bookingCount = bookingService.countBookingsByClubOwner();
            return ResponseEntity.ok(bookingCount);
        } catch (SecurityException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getBookings/{clubId}")
    public ResponseEntity<?> getBookingsByClubId(@PathVariable Long clubId) {
        try {

            List<BookingResponse> bookings = bookingService.getAllBookingsByClubId(clubId);
            return ResponseEntity.ok(bookings);
        } catch (IllegalArgumentException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("bookingID :"+id +" is canceled");
    }

    @PostMapping("/fixed")
    public ResponseEntity createFixedBooking(@RequestBody FixedBookingDetailRequest fixedBookingDetailRequest) {
        try {
            List<BookingDetailResponse> fixedBookings = bookingDetailService.createFixedBookings(fixedBookingDetailRequest);
            return new ResponseEntity<>(fixedBookings, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/bookingCombo")
    public ResponseEntity<BookingComboResponse> createBookingCombo(@RequestBody BookingComboRequest bookingComboRequest) {
        try {
        BookingResponse bkcr = bookingService.createBookingNew(bookingComboRequest.getClub_id(),bookingComboRequest.getBooking_type_id());
        BookingComboResponse bookingComboResponse = new BookingComboResponse();
        bookingComboResponse.setBookingResponse(bkcr);
        List<BookingDetailRequestCombo> bkdtrspl = bookingComboRequest.getBookingDetailRequestCombos();
        List<BookingDetailRequest> returnlist = new ArrayList<>();
        BookingDetailRequest store;
        Long id = bkcr.getId();
        if(bkcr.getBookingTypeId() == 1){
            for(BookingDetailRequestCombo bkdtr : bkdtrspl) {
                store = bookingDetailService.create1stBookingDetailCombo(bkdtr, id);
                returnlist.add(store);
            }
        } else if (bkcr.getBookingTypeId() == 2) {
            List<BookingDetailRequest> returnlistAdd = new ArrayList<>();
            for(BookingDetailRequestCombo bkdtr : bkdtrspl) {
                returnlistAdd = bookingDetailService.createFixedBookingDetailCombos(bkdtr, id);
                returnlist.addAll(returnlistAdd);
            }
        } else if (bkcr.getBookingTypeId() == 3) {
            for(BookingDetailRequestCombo bkdtr : bkdtrspl) {
                store = bookingDetailService.create3rdBookingDetailCombo(bkdtr, id);
                returnlist.add(store);
            }
        }
        bookingComboResponse.setBookingDetailRequestList(returnlist);
        return ResponseEntity.ok(bookingComboResponse);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
    public ResponseEntity<?> getCustomerBookingsWithOptionalFilter(@RequestParam(required = false) Long bookingTypeId) {
        try {
            List<BookingResponse> bookingResponses = bookingService.getCustomerBookingsWithOptionalFilter(bookingTypeId);
            return ResponseEntity.ok(bookingResponses);
        } catch (IllegalArgumentException e) {
            // Log the exception details

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }




    @PostMapping("/confirm")
    public String confirmBooking(@RequestBody QRCodeData data,@RequestParam String email) {
        try {
            bookingService.sendBookingConfirmation(data,email);
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
