package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class PreTransactionResponse {
    private Double fullPrice;
    private Double salePrice;
    private Double totalPriceNeedToPay;
}
