package click.badcourt.be.api;

import click.badcourt.be.entity.Transaction;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.model.response.TransactionResponse;
import click.badcourt.be.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/api/transactions")
    public class TransactionApi {

        @Autowired
        private TransactionService transactionService;

        @GetMapping
        public ResponseEntity<List<Transaction>> getAllTransactions() {
            return ResponseEntity.ok(transactionService.findAll());
        }

   // @PreAuthorize("hasAuthority('STAFF')")
        @PostMapping
        public ResponseEntity addTransaction(@RequestBody TransactionRequest request) {
            try {
                Transaction createdTransaction = transactionService.addTransaction(request);
                TransactionResponse transactionResponse = new TransactionResponse();
                transactionResponse.setId(createdTransaction.getTransactionId());
                transactionResponse.setStatus(createdTransaction.getStatus());
                transactionResponse.setDepositAmount(createdTransaction.getDepositAmount());
                transactionResponse.setPaymentDate(createdTransaction.getPaymentDate());
                transactionResponse.setTotalAmount(createdTransaction.getTotalAmount());
                transactionResponse.setBookingId(createdTransaction.getBooking().getBookingId());
                transactionResponse.setPaymentMethodId(createdTransaction.getPaymentMethod().getPaymentMethodId());
                return ResponseEntity.ok(transactionResponse);
            }catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody TransactionRequest request) {
            Transaction updatedTransaction = transactionService.updateTransaction(request, id);
            return ResponseEntity.ok(updatedTransaction);
        }
    }
