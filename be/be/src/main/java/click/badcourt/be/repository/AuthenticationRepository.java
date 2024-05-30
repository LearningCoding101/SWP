package click.badcourt.be.repository;

import click.badcourt.be.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    List<Account> findAccountByIsDeletedFalse();
    Account findAccountById(Long id);
}
