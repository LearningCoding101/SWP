package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.enums.BookingDetailStatusEnum;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.RoleEnum;
import click.badcourt.be.exception.BadRequestException;
import click.badcourt.be.model.request.BookingCreateRequest;
import click.badcourt.be.model.request.BookingUpdateRequest;
import click.badcourt.be.model.request.QRCodeData;
import click.badcourt.be.model.request.BookingComboRequest;
import click.badcourt.be.model.response.BookingResponse;
import click.badcourt.be.model.response.BookingResponseFeedbackYN;
import click.badcourt.be.repository.*;
import click.badcourt.be.utils.AccountUtils;
import com.google.zxing.NotFoundException;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.google.zxing.WriterException;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private BookingTypeRepository bookingTypeRepository;
    private QRCodeService qrCodeService;
    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);
    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Transactional
    @Scheduled(fixedRate = 60000) // Run the method every 60 seconds
    public void cancelPendingBookings() {
        logger.info("Scheduled task started to check and cancel pending bookings.");

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, +6);
        Date oneHourAgo = cal.getTime();

        List<Booking> bookings = bookingRepository.findByStatusAndBookingDateBefore(BookingStatusEnum.PENDING, oneHourAgo);
        for (Booking booking : bookings) {
            booking.setStatus(BookingStatusEnum.CANCELED);
            bookingRepository.save(booking);
            logger.info("Booking with ID {} has been cancelled.", booking.getBookingId());
        }
        logger.info("Scheduled task completed at {}.", oneHourAgo);
    }



    public long countBookingsByClubOwner() {
        Account currentAccount = accountUtils.getCurrentAccount();
        if (currentAccount.getRole() == RoleEnum.ClUB_OWNER) {
            return bookingRepository.findAll().stream()
                    .filter(booking -> booking.getClub().getAccount().equals(currentAccount))
                    .count();
        } else {
            throw new SecurityException("Current account does not have permission to view this information.");
        }
    }



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
        bookingResponse.setPrice(booking.getClub().getPrice());
        bookingResponse.setClub_name(club.getName()); // Assuming the Court entity has a reference to Club
        bookingResponse.setAccount_email(booking.getAccount().getEmail()); // Assuming the Account entity has an email field
        bookingResponse.setAccount_number(booking.getAccount().getPhone()); // Assuming the Account entity has an accountNumber field
        bookingResponse.setStatus(booking.getStatus());
        bookingResponse.setBookingTypeId(bookingResponse.getBookingTypeId());
        bookingResponse.setAddress(booking.getClub().getAddress());

        return bookingResponse;
    }
    public List<BookingResponseFeedbackYN> getCustomerBookingsWithOptionalFilter(Long bookingTypeId) {
        Long currentCustomerId = accountUtils.getCurrentAccount().getAccountId();
        if (!authenticationRepository.existsById(currentCustomerId)) {
            throw new IllegalArgumentException("Account not found with id: " + currentCustomerId);
        }
        List<Booking> allBookings = bookingRepository.findAll();
        List<BookingResponseFeedbackYN> bookingResponses = new ArrayList<>();
        for (Booking booking : allBookings) {
            if (booking.getAccount().getAccountId().equals(currentCustomerId) &&
                    (bookingTypeId == null || booking.getBookingType().getBookingTypeId().equals(bookingTypeId))) {
                BookingResponseFeedbackYN response = new BookingResponseFeedbackYN();
                response.setBookingDate(booking.getBookingDate());
                response.setAddress(booking.getClub().getAddress());
                response.setId(booking.getBookingId());
                response.setStatus(booking.getStatus());
                response.setClub_name(booking.getClub().getName());
                response.setAccount_number(accountUtils.getCurrentAccount().getPhone());
                response.setAccount_email(booking.getAccount().getEmail());
                response.setBookingTypeId(booking.getBookingType().getBookingTypeId());
                response.setPrice(booking.getClub().getPrice());
                response.setClubId(booking.getClub().getClubId());
                if(bookingDetailRepository.countBookingDetailsByDetailStatus_AndBooking_BookingId(BookingDetailStatusEnum.CHECKEDIN, booking.getBookingId()) > 0) {
                    response.setDisplay(true);
                }else{
                    response.setDisplay(false);
                }
                bookingResponses.add(response);
            }
        }
        return bookingResponses;
    }


    public List<BookingResponse> getAllBookingsByClubId() {

        Account currentAccount = accountUtils.getCurrentAccount();


        if (!currentAccount.getRole().equals(RoleEnum.ClUB_OWNER)) {
            throw new IllegalArgumentException("Current account is not a club owner");
        }


        Long clubId = currentAccount.getClub().getClubId();

        Optional<Club> clubOptional = clubRepository.findById(clubId);
        if (clubOptional.isEmpty()) {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }

        List<Booking> allBookings = bookingRepository.findAll();
        List<BookingResponse> bookingResponses = new ArrayList<>();

        for (Booking booking : allBookings) {
            if (booking.getClub().getClubId().equals(clubId)) {
                BookingResponse response = new BookingResponse();
                response.setId(booking.getBookingId());
                response.setBookingDate(booking.getBookingDate());
                response.setPrice(booking.getClub().getPrice());
                response.setClub_name(booking.getClub().getName());
                response.setAccount_email(booking.getAccount().getEmail());
                response.setAccount_number(booking.getAccount().getPhone());
                response.setStatus(booking.getStatus());
                response.setBookingTypeId(booking.getBookingType().getBookingTypeId());
                response.setAddress(booking.getClub().getAddress());
                response.setClubId(booking.getClub().getClubId());

                bookingResponses.add(response);
            }
        }

        return bookingResponses;
    }





    public BookingResponse createBooking(BookingCreateRequest bookingCreateRequest) {
        Booking booking = new Booking();
        Optional<Club> club= clubRepository.findById(bookingCreateRequest.getClub_id());
        Optional<BookingType> bookingType= bookingTypeRepository.findById(bookingCreateRequest.getBooking_type_id());
        if(club.isPresent()&& !club.get().isDeleted()) {

            booking.setBookingDate(bookingCreateRequest.getBookingDate());
            booking.setAccount(accountUtils.getCurrentAccount());
            booking.setClub(club.get());

            booking.setStatus(BookingStatusEnum.PENDING);
            booking.setBookingType(bookingType.get());
            Booking savedBooking= bookingRepository.save(booking);
            BookingResponse response= new BookingResponse();
            response.setId(savedBooking.getBookingId());
            response.setPrice(savedBooking.getClub().getPrice());
            response.setStatus(savedBooking.getStatus());
            response.setAccount_email(savedBooking.getAccount().getEmail());
            response.setAddress(savedBooking.getClub().getAddress());
            response.setAccount_number(accountUtils.getCurrentAccount().getPhone());
            response.setBookingDate(savedBooking.getBookingDate());
            response.setBookingTypeId(savedBooking.getBookingType().getBookingTypeId());
            response.setClub_name(savedBooking.getClub().getName());
            return response;
        }
        else{
            throw new IllegalArgumentException("Account or court not found");
        }
    }

    public BookingResponse createBookingNew(Long clubid, Long bookingTypeId) {
        Booking booking = new Booking();
        Optional<Club> club= clubRepository.findById(clubid);
        Optional<BookingType> bookingType= bookingTypeRepository.findById(bookingTypeId);
        if(club.isPresent()&& !club.get().isDeleted()) {
            Date bookingDate = new Date();
            bookingDate.setHours(bookingDate.getHours()+7);
            booking.setBookingDate(bookingDate);
            booking.setAccount(accountUtils.getCurrentAccount());
            booking.setClub(club.get());

            booking.setStatus(BookingStatusEnum.PENDING);
            booking.setBookingType(bookingType.get());
            Booking savedBooking= bookingRepository.save(booking);
            BookingResponse response= new BookingResponse();
            response.setId(savedBooking.getBookingId());
            response.setPrice(savedBooking.getClub().getPrice());
            response.setStatus(savedBooking.getStatus());
            response.setAccount_email(savedBooking.getAccount().getEmail());
            response.setAddress(savedBooking.getClub().getAddress());
            response.setAccount_number(accountUtils.getCurrentAccount().getPhone());
            response.setBookingDate(savedBooking.getBookingDate());
            response.setBookingTypeId(savedBooking.getBookingType().getBookingTypeId());
            response.setClub_name(savedBooking.getClub().getName());
            return response;
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
    public void sendBookingConfirmation(QRCodeData data,String email) throws WriterException, IOException, MessagingException {
        System.out.println(email);
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(email);
        emailDetail.setSubject("Booking successfully" );
        emailDetail.setMsgBody("");
        Runnable r = new Runnable() {
            @Override
            public void run() {
                emailService.sendEmailWithAttachment(emailDetail, data);
            }
        };
        new Thread(r).start();
    }

    public boolean validateQrCode(byte[] qrCodeData, QRCodeData expectedData) throws IOException,NotFoundException {
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
