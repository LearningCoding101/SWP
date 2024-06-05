package click.badcourt.be.service;

import click.badcourt.be.entity.Transaction;
import click.badcourt.be.model.request.TransactionRequest;
import click.badcourt.be.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }
    public Transaction addTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        transaction.setStatus(transactionRequest.getStatus());
    }
}
