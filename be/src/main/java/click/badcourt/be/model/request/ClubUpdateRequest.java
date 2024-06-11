package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class ClubUpdateRequest {

    String name;
    String address;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;
    String picture_location;
}
