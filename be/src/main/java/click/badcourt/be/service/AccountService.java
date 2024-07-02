package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.model.response.AccountManageResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    AuthenticationRepository authenticationRepository;
    public List<AccountManageResponse> getAllAccount(){
        List<AccountManageResponse> accountManageResponses = new ArrayList<>();
        for(Account account : authenticationRepository.findAll()){
            AccountManageResponse accountManageResponse = new AccountManageResponse();
            accountManageResponse.setAccountId(account.getAccountId());
            accountManageResponse.setPhone(account.getPhone());
            accountManageResponse.setPassword("******");
            accountManageResponse.setEmail(account.getEmail());
            accountManageResponse.setFullName(account.getFullName());
            accountManageResponse.setStatus(account.isDeleted() ? "Deactivate":"Active");
            accountManageResponses.add(accountManageResponse);
        }
        return accountManageResponses;
    }
}
