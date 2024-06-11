package click.badcourt.be.model.request;


import lombok.Data;

@Data
public class CourtRequest {

    int courtId;
    double price;
    Long clubId;

}
