package click.badcourt.be.api;

import click.badcourt.be.entity.BookingType;
import click.badcourt.be.model.request.BookingTypeRequest;
import click.badcourt.be.service.BookingTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking-types")
public class BookingTypeApi {

    @Autowired
    private BookingTypeService bookingTypeService;

    @GetMapping
    public List<BookingType> getAllBookingTypes() {
        return bookingTypeService.getAllBookingTypes();
    }

    @PostMapping
    public BookingType addBookingType(@RequestBody BookingTypeRequest bookingTypeRequest) {
        return bookingTypeService.add(bookingTypeRequest);
    }

    @PutMapping("/{id}")
    public BookingType updateBookingType(@RequestBody BookingTypeRequest bookingTypeRequest, @PathVariable Long id) {
        return bookingTypeService.update(bookingTypeRequest, id);
    }
}

