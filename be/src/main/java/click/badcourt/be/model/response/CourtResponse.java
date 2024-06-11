package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class CourtResponse {

    Long id;
    double price;
    Long clubId;
    boolean deleted;

}
