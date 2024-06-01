package click.badcourt.be.model.request;

import click.badcourt.be.entity.Account;
import lombok.Data;

@Data
public class ClubRequest {
    String name;
    String address;
    String open_time;
    String close_time;
    String picture_location;
    String email;

}
