package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class RegisterClubOwnerRequest {
    String phone;
    String email;
    String fullName;
}
