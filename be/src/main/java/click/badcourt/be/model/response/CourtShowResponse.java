package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class CourtShowResponse {

    Long id;
    String courtName;
    Long clubId;
    boolean deleted;
    String clubName;

}
