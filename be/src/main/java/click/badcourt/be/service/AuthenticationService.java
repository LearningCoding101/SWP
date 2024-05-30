package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.model.RegisterRequest;
import click.badcourt.be.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    AuthenticationRepository authenticationRepository;

    public Account register(RegisterRequest reg) {
        Account account = new Account();
        account.setPhone(reg.getPhone());
        account.setPassword(reg.getPassword());
        Account newacc = authenticationRepository.save(account);
        return newacc;
    }
}
