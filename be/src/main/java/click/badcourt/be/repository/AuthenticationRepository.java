package click.badcourt.be.repository;

import click.badcourt.be.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    Account findAccountByPhone(final String phone);
    Account findAccountByEmail(final String email);
}
