package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.FeedBack;
import click.badcourt.be.model.request.FeedbackCreateRequest;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.FeedbackRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRespository feedbackRespository;
    @Autowired
    private AuthenticationRepository authenticationRepository;
    @Autowired
    private BookingRepository bookingRepository;

    public List<FeedBack> getAllFeedback() {
        return feedbackRespository.findFeedBacksByIsDeletedFalse();
    }
    public FeedBack getFeedbackById(Long feedbackId) {
        return feedbackRespository.findById(feedbackId).get();
    }
    public FeedBack createFeedback(FeedbackCreateRequest feedbackCreateRequest) {
        FeedBack feedback = new FeedBack();
        Optional<Account> account= authenticationRepository.findById(feedbackCreateRequest.getAccountId());
        Optional<Booking> booking= bookingRepository.findById(feedbackCreateRequest.getBookingId());
        if(account.isPresent() && booking.isPresent()) {
            feedback.setFeedbackContent(feedbackCreateRequest.getFeedbackContent());
            feedback.setFeedbackRating(feedbackCreateRequest.getFeedbackRating());
            feedback.setAccount(account.get());
            feedback.setBooking(booking.get());
            return feedbackRespository.save(feedback);
        }
        else{
            throw new IllegalArgumentException("Account or Booking not found");
        }
    }
//    public FeedBack updateFeedback(Long feedbackId, FeedbackCreateRequest feedbackCreateRequest) {
//        FeedBack feedBack= feedbackRespository.findById(feedbackId).get();
//        Optional<Account> account= authenticationRepository.findById(feedbackCreateRequest.getAccountId());
//        Optional<Booking> booking= bookingRepository.findById(feedbackCreateRequest.getBookingId());
//        if(account.isPresent() && booking.isPresent()) {
//            feedBack.setFeedbackContent(feedbackCreateRequest.getFeedbackContent());
//            feedBack.setFeedbackRating(feedbackCreateRequest.getFeedbackRating());
//            feedBack.setAccount(account.get());
//            feedBack.setBooking(booking.get());
//            return feedbackRespository.save(feedBack);
//        }
//        else {
//            throw new IllegalArgumentException("Account or Booking not found");
//        }
//    }
    public void deleteFeedback(Long feedbackId) {
        FeedBack feedBack = feedbackRespository.findById(feedbackId).orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedBack.setDeleted(true);
        feedbackRespository.save(feedBack);
    }
}
