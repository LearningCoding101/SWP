package click.badcourt.be.service;

import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.PaymentMethod;
import click.badcourt.be.entity.Transaction;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.PaymentMethodRepository;
import click.badcourt.be.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }
    public Transaction addTransaction(TransactionRequest transactionRequest) {
        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(transactionRequest.getPaymentMethodId());
        Optional<Booking> booking= bookingRepository.findById(transactionRequest.getBookingId());
        if(paymentMethod.isPresent() && booking.isPresent()) {
            Transaction transaction = new Transaction();
            transaction.setStatus(transactionRequest.getStatus());
            transaction.setDepositAmount(transactionRequest.getTotalAmount()*50/100);
            transaction.setTotalAmount(transactionRequest.getTotalAmount());
            transaction.setPaymentDate(transactionRequest.getPaymentDate());
            transaction.setPaymentMethod(paymentMethod.get());
            transaction.setBooking(booking.get());
            return transactionRepository.save(transaction);
        }
        else{
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
    }

    public Transaction updateTransaction(TransactionRequest transactionRequest,Long id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isEmpty()) {
            throw new IllegalArgumentException("Transaction not found");
        }
        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(transactionRequest.getPaymentMethodId());
        Optional<Booking> booking = bookingRepository.findById(transactionRequest.getBookingId());
        if(paymentMethod.isPresent() && booking.isPresent()) {
            transaction.get().setDepositAmount(transactionRequest.getTotalAmount()*50/100);
            transaction.get().setTotalAmount(transactionRequest.getTotalAmount());
            transaction.get().setPaymentDate(transactionRequest.getPaymentDate());
            transaction.get().setPaymentMethod(paymentMethod.get());
            transaction.get().setBooking(booking.get());
            return transactionRepository.save(transaction.get());
        }
        else {
            throw new IllegalArgumentException("PaymentMethod or Booking not found");
        }
    }
}
