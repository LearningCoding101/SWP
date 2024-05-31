package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class ClubRequest {
    String name;
    String address;
    String open_time;
    String close_time;
    String picture_location;
}
