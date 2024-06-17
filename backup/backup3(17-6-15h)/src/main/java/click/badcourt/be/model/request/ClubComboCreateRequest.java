package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class ClubComboCreateRequest extends RegisterRequest{
    String name;
    String address;
    double price;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;
    String picture_location;
}
