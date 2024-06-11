package click.badcourt.be.service;

import click.badcourt.be.entity.*;
import click.badcourt.be.model.request.FeedbackCreateRequest;
import click.badcourt.be.model.response.FeedbackResponse;
import click.badcourt.be.repository.*;
import click.badcourt.be.utils.AccountUtils;
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
    @Autowired
    private ClubRepository clubRepository;
    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    AccountUtils accountUtils;

    public List<FeedbackResponse> getAllFeedback() {
        List<FeedBack> feedBackList= feedbackRespository.findFeedBacksByIsDeletedFalse();
        List<FeedbackResponse> feedbackResponses= new ArrayList<>();
        for(FeedBack feedBack:feedBackList){
            FeedbackResponse feedbackResponse = new FeedbackResponse();
            feedbackResponse.setFeedbackRating(feedBack.getFeedbackRating());
            feedbackResponse.setFeedbackContent(feedBack.getFeedbackContent());
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
        feedbackResponse.setBookingId(feedBack.getBooking().getBookingId());
        return feedbackResponse;
    }

    public void createFeedback(FeedbackCreateRequest feedbackCreateRequest) {
        FeedBack feedback = new FeedBack();
        Optional<Booking> booking= bookingRepository.findById(feedbackCreateRequest.getBookingId());
        if(booking.isPresent()) {

                feedback.setFeedbackContent(feedbackCreateRequest.getFeedbackContent());
                feedback.setFeedbackRating(feedbackCreateRequest.getFeedbackRating());
                feedback.setAccount(accountUtils.getCurrentAccount());
                feedback.setBooking(booking.get());
                feedback.setDeleted(false);
                feedbackRespository.save(feedback);
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
    public FeedbackResponse getFeedbackByBookingId(Long bookingId) {
        FeedBack feedBack= feedbackRespository.findByBooking_BookingId(bookingId);
        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setFeedbackRating(feedBack.getFeedbackRating());
        feedbackResponse.setFeedbackContent(feedBack.getFeedbackContent());
        feedbackResponse.setBookingId(feedBack.getBooking().getBookingId());
        return feedbackResponse;
    }
    public List<FeedbackResponse> getAllFeedBackByClubId(Long clubId) {
        Optional<Club> club = clubRepository.findById(clubId);
        if(club.isEmpty()) {
            throw new IllegalArgumentException("Club not found");
        }
        List<Court> courtList= courtRepository.findCourtsByClub_ClubId(clubId);
        List<FeedbackResponse> feedbackResponses = new ArrayList<>();
        List<Booking> bookingList = new ArrayList<>();
        for(Court court:courtList){
            List<Booking> bookings = bookingRepository.findBookingsByCourt_CourtId(court.getCourtId());
            bookingList.addAll(bookings);
        }
        for(Booking booking:bookingList){
            FeedBack feedBack = feedbackRespository.findByBooking_BookingId(booking.getBookingId());
            if(feedBack != null){
                    
            FeedbackResponse feedbackResponse = new FeedbackResponse();
            feedbackResponse.setFeedbackRating(feedBack.getFeedbackRating());
            feedbackResponse.setFeedbackContent(feedBack.getFeedbackContent());
            feedbackResponse.setBookingId(feedBack.getBooking().getBookingId());
            feedbackResponses.add(feedbackResponse);
            }
        }
        return feedbackResponses;

    }
}
