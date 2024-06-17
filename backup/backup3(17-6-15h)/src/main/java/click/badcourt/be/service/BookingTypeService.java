package click.badcourt.be.service;

import click.badcourt.be.entity.BookingType;
import click.badcourt.be.model.request.BookingTypeRequest;
import click.badcourt.be.repository.BookingTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingTypeService {
    @Autowired
    private BookingTypeRepository bookingTypeRepository;
    public List<BookingType> getAllBookingTypes() {
        return bookingTypeRepository.findAll();
    }
    public BookingType add(BookingTypeRequest bookingTypeRequest) {
        BookingType bookingType = new BookingType();
        bookingType.setBookingTypeName(bookingTypeRequest.getName());
        bookingType.setBookingDiscount(bookingTypeRequest.getDiscount());
        bookingTypeRepository.save(bookingType);
        return bookingType;
    }
    public BookingType update(BookingTypeRequest bookingTypeRequest, Long id) {
        BookingType bookingType= bookingTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("BookingType not found"));
        bookingType.setBookingTypeName(bookingTypeRequest.getName());
        bookingType.setBookingDiscount(bookingTypeRequest.getDiscount());
        bookingTypeRepository.save(bookingType);
        return bookingType;
    }
}
