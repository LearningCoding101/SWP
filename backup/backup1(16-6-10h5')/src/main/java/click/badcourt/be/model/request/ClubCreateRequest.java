package click.badcourt.be.model.request;

import jakarta.mail.Multipart;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.annotations.ApiModelProperty;
@Data
public class ClubCreateRequest {
    String name;
    String address;
    double price;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;
    String picture_location;
}
