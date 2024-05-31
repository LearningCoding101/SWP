package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class RegisterRequest {
    String phone;
    String password;
    String email;
    String fullName;
}
