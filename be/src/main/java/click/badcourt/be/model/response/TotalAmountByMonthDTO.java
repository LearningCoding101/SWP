package click.badcourt.be.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TotalAmountByMonthDTO {
    private int month;
    private int year;
    private double totalAmount;

    public TotalAmountByMonthDTO(int month, int year, double totalAmount) {
        this.month = month;
        this.year = year;
        this.totalAmount = totalAmount;
    }

}
