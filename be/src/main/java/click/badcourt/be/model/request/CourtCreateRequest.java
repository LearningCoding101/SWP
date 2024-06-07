package click.badcourt.be.model.request;

import click.badcourt.be.enums.CourtStatusEnum;
import lombok.Data;

@Data
public class CourtCreateRequest {
    double price;
    CourtStatusEnum status;
    long clubId;

}
