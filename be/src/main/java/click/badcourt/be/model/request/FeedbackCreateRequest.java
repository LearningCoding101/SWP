package click.badcourt.be.model.request;

import lombok.Data;

@Data
public class FeedbackRequest {
    String feedbackContent;
    int feedbackRating;
    Long bookingId;
    Long accountId;
}
