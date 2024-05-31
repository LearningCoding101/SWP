package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.enums.RoleEnum;
import click.badcourt.be.model.request.LoginGoogleRequest;
import click.badcourt.be.model.request.LoginRequest;
import click.badcourt.be.model.request.RegisterRequest;
import click.badcourt.be.model.response.AccountResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
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
    @Autowired
    private AuthenticationManager authenticationManager;

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

    public AccountResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getPhone(),
                loginRequest.getPassword()
        ));
        // => account chuẩn

        Account account = authenticationRepository.findAccountByPhone(loginRequest.getPhone());
        String token = tokenService.generateToken(account);

        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setPhone(account.getPhone());
        accountResponse.setToken(token);
        accountResponse.setEmail(account.getEmail());
        accountResponse.setFullName(account.getFullName());
        accountResponse.setRole(account.getRole());

        return accountResponse;
    }

    public AccountResponse loginGoogle(LoginGoogleRequest loginGoogleRequest) {
        AccountResponse accountResponse = new AccountResponse();
        try {
            FirebaseToken firebaseToken = FirebaseAuth.getInstance().verifyIdToken(loginGoogleRequest.getToken());
            String email = firebaseToken.getEmail();
            Account account = authenticationRepository.findAccountByEmail(email);
            if (account != null) {
                account.setFullName(firebaseToken.getName());
                account.setEmail(firebaseToken.getEmail());
                account = authenticationRepository.save(account);
            }
            accountResponse.setId(account.getId());
            accountResponse.setFullName(account.getFullName());
            accountResponse.setEmail(account.getEmail());
            String token = tokenService.generateToken(account);
            accountResponse.setToken(token);
        }catch (FirebaseAuthException e){
            e.printStackTrace();
        }
        return accountResponse;
    }


    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByPhone(phone);
    }
}
