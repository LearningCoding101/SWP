package click.badcourt.be.model.request;

import click.badcourt.be.enums.CourtStatusEnum;

import lombok.Data;

@Data
public class CourtRequest {
    int courtId;
    double price;
    CourtStatusEnum status;
    Long clubId;
}
