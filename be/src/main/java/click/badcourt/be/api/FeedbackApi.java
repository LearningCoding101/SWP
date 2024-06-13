//package click.badcourt.be.api;
//
//import click.badcourt.be.model.request.FeedbackCreateRequest;
//import click.badcourt.be.model.response.FeedbackResponse;
//import click.badcourt.be.service.FeedbackService;
//import io.swagger.v3.oas.annotations.security.SecurityRequirement;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/feedback")
//@SecurityRequirement(name = "api")
//public class FeedbackApi {
//
//    @Autowired
//    private FeedbackService feedbackService;
//
//    @GetMapping
//    public ResponseEntity<List<FeedbackResponse>> getAllFeedback() {
//        List<FeedbackResponse> feedbacks = feedbackService.getAllFeedback();
//        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<FeedbackResponse> getFeedbackById(@PathVariable Long id) {
//        FeedbackResponse feedback = feedbackService.getFeedbackById(id);
//        return new ResponseEntity<>(feedback, HttpStatus.OK);
//    }
//    @GetMapping("/{bookingId}")
//    public ResponseEntity<FeedbackResponse> getFeedbackByBookingId(@PathVariable Long bookingId) {
//        FeedbackResponse feedback = feedbackService.getFeedbackByBookingId(bookingId);
//        return new ResponseEntity<>(feedback, HttpStatus.OK);
//    }
//    @GetMapping("/club/{clubId}")
//    public ResponseEntity<List<FeedbackResponse>> getAllFeedbackByClubId(@PathVariable Long clubId) {
//        List<FeedbackResponse> feedbacks = feedbackService.getAllFeedBackByClubId(clubId);
//        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
//    }
//    @PostMapping
//    public ResponseEntity createFeedback(@RequestBody FeedbackCreateRequest feedbackCreateRequest) {
//        try {
//            feedbackService.createFeedback(feedbackCreateRequest);
//            return new ResponseEntity<>(feedbackCreateRequest, HttpStatus.CREATED);
//        } catch (IllegalArgumentException e) {
//            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//        }
//    }
//
////    @PutMapping("/{id}")
////    public ResponseEntity<FeedBack> updateFeedback(@PathVariable Long id, @RequestBody FeedbackCreateRequest feedbackCreateRequest) {
////        try {
////            FeedBack updatedFeedback = feedbackService.updateFeedback(id, feedbackCreateRequest);
////            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
////        } catch (IllegalArgumentException e) {
////            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
////        }
////    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
//        try {
//            feedbackService.deleteFeedback(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//}
//
