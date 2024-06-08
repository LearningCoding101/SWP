package click.badcourt.be.model.response;

import click.badcourt.be.enums.CourtStatusEnum;
import lombok.Data;

@Data
public class CourtResponse {

    long id;
    double price;
    CourtStatusEnum status;
    Long clubId;
    boolean deleted;

}
