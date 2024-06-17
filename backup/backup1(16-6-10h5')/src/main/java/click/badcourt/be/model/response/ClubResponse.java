package click.badcourt.be.model.response;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ClubResponse {
    long clubId;
    double price;
    String name;
    String address;
    LocalTime open_time;
    LocalTime close_time;
    String picture_location;
    String ownerName;
//    int count;
}
