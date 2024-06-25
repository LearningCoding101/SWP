package click.badcourt.be.model.request;

import lombok.Data;

import java.util.List;

@Data
public class CourtCreateRequestCombo {
    int numberofcourt;
    List<Long> TSId;
}
