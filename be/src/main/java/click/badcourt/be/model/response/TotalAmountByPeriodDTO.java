package click.badcourt.be.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TotalAmountByPeriodDTO {
    private String period;
    private Double totalAmount;

    public TotalAmountByPeriodDTO(String period, Double totalAmount) {
        this.period = period;
        this.totalAmount = totalAmount;
    }


}

