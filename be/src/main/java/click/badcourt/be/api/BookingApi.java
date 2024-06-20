package click.badcourt.be.api;

import click.badcourt.be.model.request.*;
import click.badcourt.be.model.response.BookingComboResponse;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.service.BookingDetailService;
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

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
        BookingResponse booking = bookingService.createBooking(bookingCreateRequest);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("bookingID :"+id +" is canceled");
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
                for(BookingDetailRequest bkdtrAdd : returnlistAdd) {
                    returnlist.add(bkdtrAdd);
                }
                returnlistAdd.clear();
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
