package click.badcourt.be.repository;

import click.badcourt.be.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    Account findAccountByPhone( String phone);
    Account findAccountByEmail( String email);

}
