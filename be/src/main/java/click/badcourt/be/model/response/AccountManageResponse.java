package click.badcourt.be.model.response;
import lombok.Data;

@Data
public class AccountManageResponse {
    Long accountId;

    String password;
    String phone;
    String email;

    String fullName;
    String Status;
}
