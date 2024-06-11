package click.badcourt.be.model.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class QRCodeData {
    private Long bookingId;
    private String name;
    private String phone;


    @Override
    public String toString() {
        return "QrCodeData{" +
                "bookingId='" + bookingId + '\'' +
                ", customerName='" + name + '\''+
                ", phone='" + phone + '\''+

                '}';
    }
}

