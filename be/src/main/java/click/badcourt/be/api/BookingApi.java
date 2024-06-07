package click.badcourt.be.api;


import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.Court;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.CourtCreateRequest;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.model.response.CourtResponse;
import click.badcourt.be.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/booking")
public class BookingApi {
        @Autowired
        private BookingService bookingService;
        @GetMapping("/{id}")
        public ResponseEntity getAllBookingByID(@RequestParam long customerID){
            return ResponseEntity.ok(bookingService.getBookingsByCustomerId(customerID));
        }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteBookingByID(@RequestParam long bookingID){
        bookingService.deleteBooking(bookingID);
        return ResponseEntity.ok( "bookingID :"+bookingID +" is deleted");
    }
    @PostMapping
    public ResponseEntity addBooking(@RequestBody BookingCreateRequest bookingCreateRequest){
        try {
            Booking createdBooking = bookingService.createBooking(bookingCreateRequest);
            BookingResponse bookingResponse=new BookingResponse();
            bookingResponse.setId(createdBooking.getBookingId());
            bookingResponse.setAccount_number(createdBooking.getAccount().getPhone());
            bookingResponse.setAccount_email(createdBooking.getAccount().getEmail());
            bookingResponse.setBookingDate(createdBooking.getBookingDate());
            bookingResponse.setStatus(createdBooking.getStatus());
            bookingResponse.setClub_name(createdBooking.getCourt().getClub().getName());
            return ResponseEntity.ok(bookingResponse);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
}
