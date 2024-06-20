package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.BookingDetail;
import click.badcourt.be.entity.PaymentMethod;
import click.badcourt.be.entity.Transaction;
import click.badcourt.be.enums.BookingStatusEnum;
import click.badcourt.be.enums.TransactionEnum;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.model.response.PreTransactionResponse;
import click.badcourt.be.model.response.TransactionResponse;
import click.badcourt.be.repository.BookingDetailRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.PaymentMethodRepository;
import click.badcourt.be.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    public List<TransactionResponse> findAll() {
        List<Transaction> transactions = transactionRepository.findAll();
        List<TransactionResponse> transactionResponses = new ArrayList<>();
        for (Transaction transaction : transactions) {
            TransactionResponse transactionResponse = new TransactionResponse();
            transactionResponse.setBookingId(transaction.getBooking().getBookingId());
            transactionResponse.setId(transaction.getTransactionId());
            transactionResponse.setPaymentMethod(transaction.getPaymentMethod().getPaymentMethodName());
            transactionResponse.setPaymentDate(transaction.getPaymentDate());
            transactionResponse.setTotalAmount(transaction.getTotalAmount());
            transactionResponse.setDepositAmount(transaction.getDepositAmount());
            transactionResponse.setStatus(transaction.getStatus().toString());
            transactionResponses.add(transactionResponse);
        }
        return transactionResponses;
    }
    public Transaction addTransactionPending(TransactionRequest transactionRequest) {
        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(transactionRequest.getPaymentMethodId());
        Optional<Booking> booking= bookingRepository.findById(transactionRequest.getBookingId());
        if(paymentMethod.isPresent() && booking.isPresent()) {
            Transaction transaction = new Transaction();
            transaction.setDepositAmount(transactionRequest.getTotalAmount()*50/100);
            transaction.setTotalAmount(TotalPrice(booking.get().getBookingId()));
            transaction.setPaymentDate(transactionRequest.getPaymentDate());
            transaction.setPaymentMethod(paymentMethod.get());
            transaction.setBooking(booking.get());
            return transactionRepository.save(transaction);
        }
        else{
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
    }
    public Transaction addTransaction(TransactionRequest transactionRequest) {
        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(transactionRequest.getPaymentMethodId());
        Optional<Booking> booking= bookingRepository.findById(transactionRequest.getBookingId());
        if(paymentMethod.isPresent() && booking.isPresent()) {
            Transaction transaction = new Transaction();
            if(transactionRequest.getStatus().equals("00")) {
                if (booking.get().getBookingType().getBookingTypeId() == 1){
                    transaction.setStatus(TransactionEnum.DEPOSITED);
                    transaction.setDepositAmount(transactionRequest.getTotalAmount() * 50 / 100);
                    }
                else {
                    transaction.setStatus(TransactionEnum.FULLY_PAID);
                    transaction.setDepositAmount(0);
                }
            }
            else {
                transaction.setStatus(TransactionEnum.CANCELED);
                booking.get().setStatus(BookingStatusEnum.CANCELED);
            }
            transaction.setTotalAmount(TotalPrice(transactionRequest.getBookingId()));
            transaction.setPaymentDate(transactionRequest.getPaymentDate());
            transaction.setPaymentMethod(paymentMethod.get());
            transaction.setBooking(booking.get());
            return transactionRepository.save(transaction);
        }
        else{
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
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
    public Double TotalPrice(Long bookingId){
        Booking booking= bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        List<BookingDetail> bookingDetails= bookingDetailRepository.findBookingDetailsByBooking_BookingId(bookingId);
        Double totalPrice= 0.0;
        for(BookingDetail bookingDetail : bookingDetails) {
            totalPrice+= booking.getClub().getPrice();
        }
        return totalPrice - totalPrice*booking.getBookingType().getBookingDiscount();
    }


    public PreTransactionResponse TotalPriceCombo(Long bookingId){
        Booking booking= bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        int n = bookingDetailRepository.countBookingDetailsByBooking_BookingId(booking.getBookingId());
        Double totalPrice = booking.getClub().getPrice()*n;
        PreTransactionResponse preTransactionResponse= new PreTransactionResponse();
            preTransactionResponse.setFullPrice(totalPrice);
            preTransactionResponse.setSalePrice(preTransactionResponse.getFullPrice()*booking.getBookingType().getBookingDiscount());
            preTransactionResponse.setTotalPriceNeedToPay(preTransactionResponse.getFullPrice()-preTransactionResponse.getSalePrice());
        return preTransactionResponse;
    }


    public TransactionResponse getTransactionsByBookingId(Long bookingId) {
        Transaction transaction = transactionRepository.findByBooking_BookingId(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        TransactionResponse transactionResponse = new TransactionResponse();
        transactionResponse.setBookingId(transaction.getBooking().getBookingId());
        transactionResponse.setId(transaction.getTransactionId());
        transactionResponse.setPaymentMethod(transaction.getPaymentMethod().getPaymentMethodName());
        transactionResponse.setPaymentDate(transaction.getPaymentDate());
        transactionResponse.setTotalAmount(transaction.getTotalAmount());
        transactionResponse.setDepositAmount(transaction.getDepositAmount());
        transactionResponse.setStatus(transaction.getStatus().toString());
        return transactionResponse;
    }
    public void updateFullyPaid(Long transactionId){
        Optional<Transaction> transaction = transactionRepository.findById(transactionId);
        if(transaction.isPresent()&&transaction.get().getStatus().equals(TransactionEnum.DEPOSITED)){
            transaction.get().setStatus(TransactionEnum.FULLY_PAID);
        }
        transactionRepository.save(transaction.get());
    }
}
