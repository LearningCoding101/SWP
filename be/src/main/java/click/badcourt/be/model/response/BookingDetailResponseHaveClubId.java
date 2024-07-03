package click.badcourt.be.model.response;

import lombok.Data;

@Data
public class BookingDetailResponseHaveClubId extends BookingDetailResponse {
    private Long clubId;
}
