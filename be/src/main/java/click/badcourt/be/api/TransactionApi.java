package click.badcourt.be.api;

import click.badcourt.be.entity.Transaction;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

        @PostMapping
        public ResponseEntity<Transaction> addTransaction(@RequestBody TransactionRequest request) {
            Transaction createdTransaction = transactionService.addTransaction(request);
            return ResponseEntity.ok(createdTransaction);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody TransactionRequest request) {
            Transaction updatedTransaction = transactionService.updateTransaction(request, id);
            return ResponseEntity.ok(updatedTransaction);
        }
    }
