package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    AuthenticationRepository authenticationRepository;
    public List<Account> getAllAccount(){
        return authenticationRepository.findAccountsByIsDeletedFalse();
    }
}
