package click.badcourt.be.model.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ClubUpdateRequest {

    String name;
    String address;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;
    MultipartFile picture_location;
}
