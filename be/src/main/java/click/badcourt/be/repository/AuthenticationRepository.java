package click.badcourt.be.repository;

import click.badcourt.be.entity.Account;
import com.google.api.services.storage.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthenticationRepository extends JpaRepository<Account, Long> {

    Account findAccountByEmail( String email);
    List<Account> findAccountsByIsDeletedFalse();
    Account findAccountByAccountId(Long accountId);
}
