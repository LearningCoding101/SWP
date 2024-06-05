package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class FeedbackCreateRequest {
    String feedbackContent;
    int feedbackRating;
    Long bookingId;
    Long accountId;
}
