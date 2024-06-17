package click.badcourt.be.api;

import click.badcourt.be.entity.Account;
import click.badcourt.be.model.request.RechargeRequestDTO;
import click.badcourt.be.model.request.RegisterRequest;
import click.badcourt.be.service.WalletService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/wallet")
@SecurityRequirement(name = "api")
public class WalletApi {

    @Autowired
    WalletService walletService;

    @PostMapping()
    public ResponseEntity createUrl(@RequestBody RechargeRequestDTO rechargeRequestDTO) throws Exception {
        String url= walletService.createUrl(rechargeRequestDTO);
        return ResponseEntity.ok(url);
    }

}
