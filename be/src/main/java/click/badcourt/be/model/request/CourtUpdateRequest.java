package click.badcourt.be.model.request;

import click.badcourt.be.enums.CourtStatusEnum;
import lombok.Data;


@Data
public class CourtUpdateRequest {
    double price;
    CourtStatusEnum status;
}
