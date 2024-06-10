package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class CourtShowResponse {

    long id;
    double price;
    long clubId;
    boolean deleted;
    String clubName;

}
