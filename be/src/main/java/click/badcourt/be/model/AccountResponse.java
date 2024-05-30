package click.badcourt.be.model;

import click.badcourt.be.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountResponse extends Account {
    private String token;

}
