package click.badcourt.be.model;

import lombok.Data;

import java.sql.Time;

@Data
public class ClubRequest {
    String name;
    String address;
    String open_time;
    String close_time;
    String picture_location;
}
