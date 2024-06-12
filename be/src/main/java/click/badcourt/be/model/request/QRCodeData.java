package click.badcourt.be.model.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QRCodeData {
    private Long bookingId;
    private String name;
    private String phone;
    private String email;

    @Override
    public String toString() {
        return "QrCodeData{" +
                "bookingId='" + bookingId + '\'' +
                ", customerName='" + name + '\''+
                ", phone='" + phone + '\''+
                ", email='" + email + '\''+
                '}';
    }
}

