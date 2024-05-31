package click.badcourt.be.model.response;

import click.badcourt.be.entity.Account;
import click.badcourt.be.enums.RoleEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountResponse extends Account {
    private String token;
    long id;
    String password;
    String phone;
    String email;
    String fullName;
    boolean isDeleted;
    RoleEnum role;
}
