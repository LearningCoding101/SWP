package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.BookingDetail;
import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.Transaction;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.TransactionEnum;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.model.response.MoneyPredictResponse;
import click.badcourt.be.model.response.PreTransactionResponse;
import click.badcourt.be.model.response.TotalAmountByMonthDTO;
import click.badcourt.be.model.response.TransactionResponse;
import click.badcourt.be.repository.*;
import click.badcourt.be.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;
    @Autowired
    private ClubRepository clubRepository;
    @Autowired
    private BookingTypeRepository bookingTypeRepository;
    @Autowired
    private AccountUtils accountUtils;

    public List<TransactionResponse> findAll() {
        List<Transaction> transactions = transactionRepository.findAll();
        List<TransactionResponse> transactionResponses = new ArrayList<>();
        for (Transaction transaction : transactions) {
            TransactionResponse transactionResponse = new TransactionResponse();
            transactionResponse.setBookingId(transaction.getBooking().getBookingId());
            transactionResponse.setId(transaction.getTransactionId());
            transactionResponse.setPaymentDate(transaction.getPaymentDate());
            transactionResponse.setTotalAmount(transaction.getTotalAmount());
            transactionResponse.setDepositAmount(transaction.getDepositAmount());
            transactionResponse.setStatus(transaction.getStatus().toString());
            transactionResponses.add(transactionResponse);
        }
        return transactionResponses;
    }
    public Transaction addTransactionPending(TransactionRequest transactionRequest) {
        Optional<Booking> booking= bookingRepository.findById(transactionRequest.getBookingId());
        if(booking.isPresent()) {
            Transaction transaction = new Transaction();
            transaction.setDepositAmount(TotalPrice(transactionRequest.getBookingId())*50/100);
            transaction.setTotalAmount(TotalPrice(booking.get().getBookingId()));
            transaction.setPaymentDate(new Date());
            transaction.setBooking(booking.get());
            return transactionRepository.save(transaction);
        }
        else{
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
    }
    public Transaction addTransaction(TransactionRequest transactionRequest) {
        Optional<Booking> booking= bookingRepository.findById(transactionRequest.getBookingId());
        if(booking.isPresent()) {
            Transaction transaction = new Transaction();
            if(transactionRequest.getStatus().equals("00")) {
                if (booking.get().getBookingType().getBookingTypeId() == 1){
                    transaction.setStatus(TransactionEnum.DEPOSITED);
                    booking.get().setStatus(BookingStatusEnum.COMPLETED);
                    transaction.setDepositAmount((TotalPrice(transactionRequest.getBookingId()) * 0.5)-((TotalPrice(transactionRequest.getBookingId())*0.5)%10));
                    }
                else {
                    transaction.setStatus(TransactionEnum.FULLY_PAID);
                    booking.get().setStatus(BookingStatusEnum.COMPLETED);
                    transaction.setDepositAmount(0.0);
                }
            }
            else {
                transaction.setStatus(TransactionEnum.CANCELED);
                booking.get().setStatus(BookingStatusEnum.CANCELED);
            }
            transaction.setTotalAmount(TotalPrice(transactionRequest.getBookingId()));
            transaction.setPaymentDate(new Date());
            transaction.setBooking(booking.get());
            return transactionRepository.save(transaction);
        }
        else{
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
    }

    public Double TotalPrice(Long bookingId){
        Booking booking= bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        List<BookingDetail> bookingDetails= bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);
        Double totalPrice= 0.0;
        if(booking.getBookingType().getBookingTypeId() == 1 || booking.getBookingType().getBookingTypeId() == 2){
            for(BookingDetail bookingDetail : bookingDetails) {
                totalPrice += booking.getClub().getPrice();
            }
            totalPrice = totalPrice*(1-booking.getBookingType().getBookingDiscount()) - (totalPrice*(1-booking.getBookingType().getBookingDiscount()))%10;
        } else if (booking.getBookingType().getBookingTypeId() == 3) {
            Double salealready = booking.getClub().getPrice()*(1-booking.getBookingType().getBookingDiscount())*(bookingDetailRepository.countBookingDetailsByBooking_BookingId(bookingId));
            totalPrice = salealready - salealready%10;
        }
        return totalPrice;
    }

    public PreTransactionResponse TotalPriceCombo(Long bookingId){
        Booking booking= bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        int n = bookingDetailRepository.countBookingDetailsByBooking_BookingId(booking.getBookingId());
        Double totalPrice = booking.getClub().getPrice()*n;
        PreTransactionResponse preTransactionResponse= new PreTransactionResponse();
            preTransactionResponse.setFullPrice(totalPrice);
            preTransactionResponse.setTotalPriceNeedToPay(TotalPrice(booking.getBookingId()));
            preTransactionResponse.setSalePrice(preTransactionResponse.getFullPrice()-preTransactionResponse.getTotalPriceNeedToPay());
        return preTransactionResponse;
    }


    public TransactionResponse getTransactionsByBookingId(Long bookingId) {
        Transaction transaction = transactionRepository.findByBooking_BookingId(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        Long ownerId = accountUtils.getCurrentAccount().getAccountId();
        if(Objects.equals(transaction.getBooking().getClub().getAccount().getAccountId(), ownerId)) {
            TransactionResponse transactionResponse = new TransactionResponse();
            transactionResponse.setBookingId(transaction.getBooking().getBookingId());
            transactionResponse.setId(transaction.getTransactionId());
            transactionResponse.setPaymentDate(transaction.getPaymentDate());
            transactionResponse.setTotalAmount(transaction.getTotalAmount());
            transactionResponse.setDepositAmount(transaction.getDepositAmount());
            transactionResponse.setStatus(transaction.getStatus().toString());
            return transactionResponse;
        }else{
            throw new IllegalArgumentException("Transaction not found");
        }

    }

    public Long getPredictedPriceByGivenInfo(Long clubId, Long bookingTypeId, Integer num) {
        Double money = 0.0;
        Club club = clubRepository.findClubByClubId(clubId);
        Double price = club.getPrice();
        Double scale = Double.valueOf(1 - bookingTypeRepository.findBookingTypeByBookingTypeId(bookingTypeId).getBookingDiscount());
        Double cal = price * num;
        if (bookingTypeId == 1){
            money = price;
        } else if (bookingTypeId == 2){
            money = cal * scale - (cal * scale) % 10;
        } else if (bookingTypeId == 3){
            money = price + cal * scale - (cal * scale) % 10;
        }
        return money.longValue();
    }

    public Long getPredictedPriceByGivenInfoCombo(Long clubId, Long bookingTypeId, Integer num) {
        Double money = 0.0;
        Club club = clubRepository.findClubByClubId(clubId);
        Double price = club.getPrice();
        Double scale = Double.valueOf(1 - bookingTypeRepository.findBookingTypeByBookingTypeId(bookingTypeId).getBookingDiscount());
        Double cal = price * num;
        if (bookingTypeId == 1){
            money = (price-price*0.5)-(price-price*0.5)%10;
        } else if (bookingTypeId == 2){
            money = cal * scale - (cal * scale) % 10;
        } else if (bookingTypeId == 3){
            money = price + cal * scale - (cal * scale) % 10;
        }
        return money.longValue();
    }


    public void updateFullyPaid(Long transactionId){
        Optional<Transaction> transaction = transactionRepository.findById(transactionId);
        if(transaction.isPresent()&&transaction.get().getStatus().equals(TransactionEnum.DEPOSITED)){
            transaction.get().setStatus(TransactionEnum.FULLY_PAID);
        }
        transactionRepository.save(transaction.get());
    }
    public List<TotalAmountByMonthDTO> getTotalAmountByMonth(int year) {
        List<Object[]> result = transactionRepository.getTotalAmountByMonth(year);

        // Initialize array for 12 months with total amount 0
        List<TotalAmountByMonthDTO> totalAmountByMonthList = IntStream.rangeClosed(1, 12)
                .mapToObj(month -> new TotalAmountByMonthDTO(month, year, 0.0))
                .collect(Collectors.toList());

        // Populate actual data for months with transactions
        for (Object[] row : result) {
            int month = (int) row[0];
            double totalAmount = (double) row[1];

            // Find the corresponding DTO and update total amount
            TotalAmountByMonthDTO dto = totalAmountByMonthList.stream()
                    .filter(item -> item.getMonth() == month)
                    .findFirst()
                    .orElse(null);

            if (dto != null) {
                dto.setTotalAmount(totalAmount);
            }
        }

        return totalAmountByMonthList;
    }


    //    public Transaction updateTransaction(TransactionRequest transactionRequest,Long id) {
//        Optional<Transaction> transaction = transactionRepository.findById(id);
//        if(transaction.isEmpty()) {
//            throw new IllegalArgumentException("Transaction not found");
//        }
//        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(transactionRequest.getPaymentMethodId());
//        Optional<Booking> booking = bookingRepository.findById(transactionRequest.getBookingId());
//        if(paymentMethod.isPresent() && booking.isPresent()) {
//            transaction.get().setDepositAmount(transactionRequest.getTotalAmount()*50/100);
//            transaction.get().setTotalAmount(TotalPrice(booking.get().getBookingId()));
//            transaction.get().setPaymentDate(transactionRequest.getPaymentDate());
//            transaction.get().setPaymentMethod(paymentMethod.get());
//            transaction.get().setBooking(booking.get());
//            return transactionRepository.save(transaction.get());
//        }
//        else {
//            throw new IllegalArgumentException("PaymentMethod or Booking not found");
//        }
//    }
}
