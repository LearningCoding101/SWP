package click.badcourt.be.model.request;

import jakarta.mail.Multipart;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.annotations.ApiModelProperty;
@Data
public class ClubCreateRequest {
    String name;
    String address;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;
//    @ApiModelProperty(dataType = "file")
    MultipartFile picture_location;
}
