package click.badcourt.be.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginRequest {
    private String phone;
    private String password;
}
