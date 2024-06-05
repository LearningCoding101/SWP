package click.badcourt.be.service;

import click.badcourt.be.model.request.FeedbackRequest;
import click.badcourt.be.repository.FeedbackRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRespository feedbackRespository;

    public List<FeedbackRequest> getAllFeedback() {
        return
    }
}
