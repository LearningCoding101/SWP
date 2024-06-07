package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Booking;
import click.badcourt.be.entity.FeedBack;
import click.badcourt.be.model.request.FeedbackCreateRequest;
import click.badcourt.be.model.response.FeedbackResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.BookingRepository;
import click.badcourt.be.repository.FeedbackRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<FeedbackResponse> getAllFeedback() {
        List<FeedBack> feedBackList= feedbackRespository.findFeedBacksByIsDeletedFalse();
        List<FeedbackResponse> feedbackResponses= new ArrayList<>();
        for(FeedBack feedBack:feedBackList){
            FeedbackResponse feedbackResponse = new FeedbackResponse();
            feedbackResponse.setFeedbackRating(feedBack.getFeedbackRating());
            feedbackResponse.setFeedbackContent(feedBack.getFeedbackContent());
            feedbackResponse.setAccountId(feedBack.getAccount().getAccountId());
            feedbackResponse.setBookingId(feedBack.getBooking().getBookingId());
            feedbackResponses.add(feedbackResponse);
        }
        return feedbackResponses;
    }
    public FeedbackResponse getFeedbackById(Long feedbackId) {
        FeedBack feedBack = feedbackRespository.findById(feedbackId).orElseThrow(() -> new RuntimeException("Feedback not found"));
        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setFeedbackRating(feedBack.getFeedbackRating());
        feedbackResponse.setFeedbackContent(feedBack.getFeedbackContent());
        feedbackResponse.setAccountId(feedBack.getAccount().getAccountId());
        feedbackResponse.setBookingId(feedBack.getBooking().getBookingId());
        return feedbackResponse;
    }
    public void createFeedback(FeedbackCreateRequest feedbackCreateRequest) {
        FeedBack feedback = new FeedBack();
        Optional<Account> account= authenticationRepository.findById(feedbackCreateRequest.getAccountId());
        Optional<Booking> booking= bookingRepository.findById(feedbackCreateRequest.getBookingId());
        if(account.isPresent() && booking.isPresent()) {
            if (booking.get().getAccount().getAccountId() != feedbackCreateRequest.getAccountId()) {
                throw new IllegalArgumentException("Account Id is not correct");
            } else {
                feedback.setFeedbackContent(feedbackCreateRequest.getFeedbackContent());
                feedback.setFeedbackRating(feedbackCreateRequest.getFeedbackRating());
                feedback.setAccount(account.get());
                feedback.setBooking(booking.get());
                feedback.setDeleted(false);
                feedbackRespository.save(feedback);
            }
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
