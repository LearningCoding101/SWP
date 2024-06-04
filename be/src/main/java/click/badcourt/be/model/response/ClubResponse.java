package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class ClubResponse {
    Long id;
    String name;
    String address;
    String open_time;
    String close_time;
    String picture_location;
    Long onwerId;
}
