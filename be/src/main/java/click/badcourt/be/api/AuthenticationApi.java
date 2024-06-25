package click.badcourt.be.api;

import click.badcourt.be.entity.Account;
import click.badcourt.be.model.request.*;
import click.badcourt.be.model.response.AccountResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.service.AccountService;
import click.badcourt.be.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class AuthenticationApi {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    private AuthenticationRepository authenticationRepository;
    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest) {
        Account account= authenticationService.register(registerRequest);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/registeradmin")
    public ResponseEntity registerAdmin(@RequestBody RegisterRequest registerRequest) {
        Account account= authenticationService.registerAdmin(registerRequest);
        return ResponseEntity.ok(account);
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
//    @PostMapping("/registerclubowner")
//    public ResponseEntity registerClubOwner(@RequestBody RegisterRequest registerRequest) {
//        Account account= authenticationService.registerClubOwner(registerRequest);
//        return ResponseEntity.ok(account);
//    }


//    @PreAuthorize("hasAuthority('ClUB_OWNER')")
    @PostMapping("/registerstaff")
    public ResponseEntity registerStaff(@RequestBody RegisterRequest registerRequest) {
        Account account= authenticationService.registerStaff(registerRequest);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    @PostMapping("/login-google")
    public ResponseEntity<AccountResponse> loginGoogle(@RequestBody LoginGoogleRequest loginRequest) {
        return ResponseEntity.ok(authenticationService.loginGoogle(loginRequest));
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        authenticationService.forgotPassword(forgotPasswordRequest);
    }

    @PostMapping("/set-password")
    public void setPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        authenticationService.setPassword(forgotPasswordRequest);
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        authenticationService.resetPassword(resetPasswordRequest);
    }



    @GetMapping("/account/{email}")
    public ResponseEntity getAccount(@PathVariable String email) {
        Account account= authenticationService.getAccountByEmail(email);
        return ResponseEntity.ok(account);
    }
    @GetMapping("/accounts")
    public ResponseEntity getAccounts() {
        return ResponseEntity.ok(accountService.getAllAccount());
    }
}
