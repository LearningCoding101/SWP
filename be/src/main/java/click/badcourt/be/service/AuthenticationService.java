package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.EmailDetail;
import click.badcourt.be.enums.RoleEnum;
import click.badcourt.be.exception.BadRequestException;
import click.badcourt.be.model.request.*;
import click.badcourt.be.model.response.AccountResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public AccountResponse  login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        ));
        // => account chuẩn

        Account account = authenticationRepository.findAccountByEmail(loginRequest.getEmail());
        String token = tokenService.generateToken(account);

        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setPhone(account.getPhone());
        accountResponse.setToken(token);
        accountResponse.setEmail(account.getEmail());
        accountResponse.setFullName(account.getFullName());
        accountResponse.setRole(account.getRole());
        accountResponse.setAccountId(account.getAccountId());

        return accountResponse;
    }

    public AccountResponse loginGoogle(LoginGoogleRequest loginGoogleRequest) {
        AccountResponse accountResponse = new AccountResponse();
        try {
            FirebaseToken firebaseToken = FirebaseAuth.getInstance().verifyIdToken(loginGoogleRequest.getToken());
            String email = firebaseToken.getEmail();
            Account account = authenticationRepository.findAccountByEmail(email);
            if (account == null) {
                account = new Account();
                account.setFullName(firebaseToken.getName());
                account.setEmail(firebaseToken.getEmail());
                account.setRole(RoleEnum.CUSTOMER);
                account = authenticationRepository.save(account);
            }
            accountResponse.setAccountId(account.getAccountId());
            accountResponse.setFullName(account.getFullName());
            accountResponse.setRole(RoleEnum.CUSTOMER);
            accountResponse.setEmail(account.getEmail());
            String token = tokenService.generateToken(account);
            accountResponse.setToken(token);
        }catch (FirebaseAuthException e){
            e.printStackTrace();
        }
        return accountResponse;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByEmail(email);
    }

    public void forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        System.out.println(forgotPasswordRequest.getEmail());
        Account account = authenticationRepository.findAccountByEmail(forgotPasswordRequest.getEmail());
        if (account == null) {
            try {
                throw new BadRequestException("Account not found!");
            }catch (RuntimeException e){
                throw new RuntimeException(e);
            }
        }
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(account.getEmail());
        emailDetail.setSubject("Reset password for account " + forgotPasswordRequest.getEmail() + "!");
        emailDetail.setMsgBody("");
        emailDetail.setButtonValue("Reset password");
        emailDetail.setFullName(account.getFullName());
        emailDetail.setLink("http://badcourts.click/reset-password?token=" + tokenService.generateToken(account));
        Runnable r = new Runnable() {
            @Override
            public void run() {
                emailService.sendMailTemplate(emailDetail);
            }
        };
        new Thread(r).start();
    }

    public Account getCurrentAccount(){
        return (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        Account account = getCurrentAccount();
        account.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        authenticationRepository.save(account);

    }
    public Account getAccountByEmail(String email) {
        Account account = authenticationRepository.findAccountByEmail(email);
        if(account == null){
            try {
                throw new BadRequestException("Account not found!");
            }catch (RuntimeException e){
                throw new RuntimeException(e);
            }
        }
        else {return account;}
    }
}
