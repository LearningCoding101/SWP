package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.enums.RoleEnum;
import click.badcourt.be.model.EmailDetail;
import click.badcourt.be.model.RegisterRequest;
import click.badcourt.be.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {
    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    @Autowired
    TokenService tokenService;

    public Account register(RegisterRequest reg) {
        Account account = new Account();
        account.setPhone(reg.getPhone());
        account.setPassword(passwordEncoder.encode(reg.getPassword()));
        account.setRole(RoleEnum.CUSTOMER);
        account.setEmail(reg.getEmail());
        account.setFullName(reg.getFullName());

//        EmailDetail emailDetail = new EmailDetail();
//        emailDetail.setRecipient(account.getEmail());
//        emailDetail.setSubject("You are invited to system!");
//        emailDetail.setMsgBody("aaa");

        return authenticationRepository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByPhone(phone);
    }
}
