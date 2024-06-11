package click.badcourt.be.repository;

import click.badcourt.be.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<Account, Long> {

    Account findAccountByEmail( String email);

}
