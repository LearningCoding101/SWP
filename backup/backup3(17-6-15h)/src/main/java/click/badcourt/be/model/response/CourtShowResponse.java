package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class CourtShowResponse {

    Long id;
    double price;
    Long clubId;
    boolean deleted;
    String clubName;

}
