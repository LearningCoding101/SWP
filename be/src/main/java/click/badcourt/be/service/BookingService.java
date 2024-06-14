package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.exception.BadRequestException;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
import click.badcourt.be.model.request.QRCodeData;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.repository.*;
import click.badcourt.be.utils.AccountUtils;
import com.google.zxing.NotFoundException;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AccountUtils accountUtils;
    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private ClubRepository clubRepository;
    @Autowired
    private AuthenticationRepository authenticationRepository;

    @Autowired
    private EmailService emailService;
    private QRCodeService qrCodeService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private BookingTypeRepository bookingTypeRepository;


    public BookingResponse updateBooking (BookingUpdateRequest bookingUpdateRequest, Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));

        Club club = clubRepository.findById(bookingUpdateRequest.getClub_id()).orElseThrow(()->new RuntimeException("Club not found"));
        booking.setClub(club);
        booking.setStatus(bookingUpdateRequest.getBookingStatusEnum());

        booking = bookingRepository.save(booking);

        // Create a new BookingResponse and set the fields
        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setId(booking.getBookingId());
        bookingResponse.setBookingDate(booking.getBookingDate());
        bookingResponse.setClub_name(club.getName()); // Assuming the Court entity has a reference to Club
        bookingResponse.setAccount_email(booking.getAccount().getEmail()); // Assuming the Account entity has an email field
        bookingResponse.setAccount_number(booking.getAccount().getPhone()); // Assuming the Account entity has an accountNumber field
        bookingResponse.setStatus(booking.getStatus());
        bookingResponse.setBookingTypeId(bookingResponse.getBookingTypeId());
        bookingResponse.setAddress(booking.getClub().getAddress());
        return bookingResponse;
    }
    public List<BookingResponse> getBookingsByCustomerIdWithResponse() {
        if (!authenticationRepository.existsById(accountUtils.getCurrentAccount().getAccountId())) {
            throw new IllegalArgumentException("Booking not found with id: " + accountUtils.getCurrentAccount().getAccountId());
        }
        List<Booking> allBookings = bookingRepository.findAll();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (Booking booking : allBookings) {
            if (booking.getAccount().getAccountId() == accountUtils.getCurrentAccount().getAccountId()) {
                BookingResponse response= new BookingResponse();
                response.setBookingDate(booking.getBookingDate());
                response.setAddress(booking.getClub().getAddress());
                response.setId(booking.getBookingId());
                response.setStatus(booking.getStatus());
                response.setClub_name(booking.getClub().getName());
                response.setAccount_number(booking.getAccount().getPhone());
                response.setAccount_email(booking.getAccount().getEmail());
                response.setBookingTypeId(booking.getBookingType().getBookingTypeId());
                bookingResponses.add(response);
            }
        }
        return bookingResponses;
    }
//    public List<Booking> getBookingsByCustomerId(Long customerId) {
//        List<Booking> bookingList= bookingRepository.findBookingsByDeletedFalse();
//        if (!authenticationRepository.existsById(customerId)) {
//            throw new IllegalArgumentException("Booking not found with id: " + customerId);
//        }
//
//        List<Booking> allBookings = bookingRepository.findBookingsByDeletedFalse();
//
//        // Filter the courts by clubId using a for loop
//        List<Booking> Bookings = new ArrayList<>();
//        for (Booking booking : allBookings) {
//            if (booking.getAccount().getAccountId() == customerId) {
//                Bookings.add(booking);
//            }
//        }
//        return Bookings;
//
//    }

    public Booking createBooking(BookingCreateRequest bookingCreateRequest) {

        Booking booking = new Booking();
        Optional<Club> club= clubRepository.findById(bookingCreateRequest.getClub_id());
        Optional<BookingType> bookingType= bookingTypeRepository.findById(bookingCreateRequest.getBooking_type_id());
        if(club.isPresent()&& !club.get().isDeleted()) {
            booking.setBookingDate(bookingCreateRequest.getBookingDate());
            booking.setAccount(accountUtils.getCurrentAccount());
            booking.setClub(club.get());
            booking.setStatus(BookingStatusEnum.PENDING);
            booking.setBookingType(bookingType.get());
            return bookingRepository.save(booking);
        }
        else{
            throw new IllegalArgumentException("Account or court not found");
        }
    }

    public void cancelBooking(Long bookingId){
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(BookingStatusEnum.CANCELED);
        bookingRepository.save(booking);
    }
    public void sendBookingConfirmation(QRCodeData data) throws WriterException, IOException, MessagingException {
        String filePath = "D:/Nguyen/qr-code.png";  // Specify the correct path
        qrCodeService.generateQRCode(data, filePath);


        Account account = accountUtils.getCurrentAccount();
        if (account == null) {
            try {
                throw new BadRequestException("Account not found!");
            }catch (RuntimeException e){
                throw new RuntimeException(e);
            }
        }
        System.out.println(account.getEmail());
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(account.getEmail());
        emailDetail.setSubject("Booking successfully" );
        emailDetail.setMsgBody("");
        emailDetail.setFullName(account.getFullName());
        emailDetail.setLink("http://badcourts.click/reset-password?token=" + tokenService.generateToken(account));
        Runnable r = new Runnable() {
            @Override
            public void run() {
                emailService.sendEmailWithAttachment(emailDetail, filePath);
            }
        };
        new Thread(r).start();
    }

    public boolean validateQrCode(byte[] qrCodeData, QRCodeData expectedData) throws IOException, NotFoundException, NotFoundException {
        QRCodeData decodedData = qrCodeService.decodeQr(qrCodeData);
        return decodedData != null && decodedData.getBookingId().equals(expectedData.getBookingId());
    }


    //    public List<Booking> getBookingsByCustomerId(Long customerId) {
//        List<Booking> bookingList= bookingRepository.findBookingsByDeletedFalse();
//        if (!authenticationRepository.existsById(customerId)) {
//            throw new IllegalArgumentException("Booking not found with id: " + customerId);
//        }
//
//        List<Booking> allBookings = bookingRepository.findBookingsByDeletedFalse();
//
//        // Filter the courts by clubId using a for loop
//        List<Booking> Bookings = new ArrayList<>();
//        for (Booking booking : allBookings) {
//            if (booking.getAccount().getAccountId() == customerId) {
//                Bookings.add(booking);
//            }
//        }
//        return Bookings;
//
//    }
}
