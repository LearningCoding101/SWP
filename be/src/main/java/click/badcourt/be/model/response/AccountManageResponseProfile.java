package click.badcourt.be.model.response;
import click.badcourt.be.enums.RoleEnum;
import lombok.Data;

@Data
public class AccountManageResponseProfile {
    Long accountId;

    String password;
    String phone;
    String email;
    RoleEnum role;

    String fullName;
}
