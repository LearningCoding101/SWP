package click.badcourt.be.model.response;

import click.badcourt.be.enums.CourtStatusEnum;
import lombok.Data;

@Data
public class CourtShowResponse {
    long id;
    double price;
    CourtStatusEnum status;
    long  clubId;
    boolean deleted;
   String clubName;
}
