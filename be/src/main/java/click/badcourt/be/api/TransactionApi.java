package click.badcourt.be.api;

import click.badcourt.be.entity.Transaction;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.model.response.PreTransactionResponse;
import click.badcourt.be.model.response.TransactionResponse;
import click.badcourt.be.service.TransactionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/api/transactions")
    @SecurityRequirement(name = "api")
    public class TransactionApi {

        @Autowired
        private TransactionService transactionService;

        @GetMapping
        public ResponseEntity<List<TransactionResponse>> getAllTransactions() {
            return ResponseEntity.ok(transactionService.findAll());
        }
        @GetMapping("/price/{bookingId}")
        public PreTransactionResponse getPrice(@PathVariable Long bookingId){
            PreTransactionResponse pretrans = transactionService.TotalPriceCombo(bookingId);
            return pretrans;
        }

   // @PreAuthorize("hasAuthority('STAFF')")
        @PostMapping
        public ResponseEntity addTransaction(@RequestBody TransactionRequest request) {
            try {
                Transaction createdTransaction = transactionService.addTransaction(request);
                TransactionResponse transactionResponse = new TransactionResponse();
                transactionResponse.setId(createdTransaction.getTransactionId());
                transactionResponse.setDepositAmount(createdTransaction.getDepositAmount());
                transactionResponse.setPaymentDate(createdTransaction.getPaymentDate());
                transactionResponse.setTotalAmount(createdTransaction.getTotalAmount());
                transactionResponse.setBookingId(createdTransaction.getBooking().getBookingId());
                transactionResponse.setStatus(createdTransaction.getStatus().toString());
                return ResponseEntity.ok(transactionResponse);
            }catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

//        @PutMapping("/{id}")
//        public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody TransactionRequest request) {
//            Transaction updatedTransaction = transactionService.updateTransaction(request, id);
//            return ResponseEntity.ok(updatedTransaction);
//        }
        @GetMapping("/{bookingId}")
        public ResponseEntity getTransactionByBookingId(@PathVariable Long bookingId) {
            TransactionResponse transactionResponse =transactionService.getTransactionsByBookingId(bookingId);
            return ResponseEntity.ok(transactionResponse);
        }



        @PutMapping("/{id}")
        public ResponseEntity updateTransactionFullyPaid(@PathVariable Long id) {
            try{
                transactionService.updateFullyPaid(id);
                return new ResponseEntity<>("FullyPaid Successfully !", HttpStatus.CREATED);
            }catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
    }
