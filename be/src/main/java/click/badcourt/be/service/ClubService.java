package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Club;
import click.badcourt.be.enums.RoleEnum;
import click.badcourt.be.model.request.ClubComboCreateRequest;
import click.badcourt.be.model.request.ClubCreateRequest;
import click.badcourt.be.model.request.ClubUpdateRequest;
import click.badcourt.be.model.response.ClubResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.repository.CourtRepository;
import click.badcourt.be.utils.AccountUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import java.time.LocalTime;

@Service
public class ClubService {

    @Autowired
    ClubRepository clubRepository;
    @Autowired
    AccountUtils accountUtils;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private FeedbackService feedbackService;

    private static final Logger logger = LoggerFactory.getLogger(ClubService.class);

//    @Transactional
//    @Scheduled(fixedRate = 30000)
//    public void verifyClub(){
//        List<Club> club = clubRepository.findAll();
//        for (Club clubcheck : club) {
//            if(clubcheck.isDeleted() && clubcheck.getAccount().getPassword() == null){
//                clubcheck.setDeleted(false);
//                logger.info("Club" + clubcheck.getClubId() + "activated");
//            }
//        }
//
//    }

    public ClubResponse getClubByCurrentAccount() {
        Account currentAccount = accountUtils.getCurrentAccount();

        if (currentAccount.getRole() != RoleEnum.ClUB_OWNER) {

            throw new IllegalStateException("Access denied: Only club owners can retrieve club information.");
        }

        Club club = currentAccount.getClub();

        if (club != null) {

            ClubResponse clubResponse = new ClubResponse();
            clubResponse.setClubId(club.getClubId());
            clubResponse.setPrice(club.getPrice());
            clubResponse.setName(club.getName());
            clubResponse.setAddress(club.getAddress());
            clubResponse.setOpen_time(club.getOpen_time());
            clubResponse.setClose_time(club.getClose_time());
            clubResponse.setPicture_location(club.getPicture_location());
            clubResponse.setOwnerName(currentAccount.getFullName());


            return clubResponse;
        } else {

            throw new IllegalStateException("Club not found for the current account.");
        }
    }

    public List<ClubResponse> getAllClubs() {
        List<Club> clubs = clubRepository.findClubsByDeletedFalse();
        List<ClubResponse> clubCreateResponse = new ArrayList<>();
        for(Club club : clubs) {

            ClubResponse clubResponse = new ClubResponse();
            clubResponse.setName(club.getName());
            clubResponse.setAddress(club.getAddress());
            clubResponse.setOpen_time(club.getOpen_time());
            clubResponse.setClose_time(club.getClose_time());
            clubResponse.setOwnerName(club.getAccount().getFullName());
            clubResponse.setPicture_location(club.getPicture_location());
            clubResponse.setPrice(club.getPrice());
            clubResponse.setClubId(club.getClubId());
            clubResponse.setRating(feedbackService.getFeedbackAverageRating(club.getClubId()));
            clubResponse.setFeedbacks(feedbackService.getNumberOfFeedback(club.getClubId()));
            clubResponse.setActive(!club.isDeleted());
//            clubResponse.setRating(feedbackService.getFeedbackAverageRating(club.getClubId()));
//            clubResponse.setFeedbacks(feedbackService.getNumberOfFeedback(club.getClubId()));
//            clubResponse.setCount(courtRepository.countCourtsByClub_ClubId(club.getClubId()));
            clubResponse.setClubId(club.getClubId());

            clubCreateResponse.add(clubResponse);

        }
        return clubCreateResponse;
    }
    public List<ClubResponse> getAllClubsAdmin() {
        List<Club> clubs = clubRepository.findAll();
        List<ClubResponse> clubCreateResponse = new ArrayList<>();
        for(Club club : clubs) {

            ClubResponse clubResponse = new ClubResponse();
            clubResponse.setName(club.getName());
            clubResponse.setAddress(club.getAddress());
            clubResponse.setOpen_time(club.getOpen_time());
            clubResponse.setClose_time(club.getClose_time());
            clubResponse.setOwnerName(club.getAccount().getFullName());
            clubResponse.setPicture_location(club.getPicture_location());
            clubResponse.setPrice(club.getPrice());
            clubResponse.setClubId(club.getClubId());
            clubResponse.setRating(feedbackService.getFeedbackAverageRating(club.getClubId()));
            clubResponse.setFeedbacks(feedbackService.getNumberOfFeedback(club.getClubId()));
            clubResponse.setActive(!club.isDeleted());
//            clubResponse.setRating(feedbackService.getFeedbackAverageRating(club.getClubId()));
//            clubResponse.setFeedbacks(feedbackService.getNumberOfFeedback(club.getClubId()));
//            clubResponse.setCount(courtRepository.countCourtsByClub_ClubId(club.getClubId()));
            clubResponse.setClubId(club.getClubId());

            clubCreateResponse.add(clubResponse);

        }
        return clubCreateResponse;
    }

    public Club createClub(ClubCreateRequest clubCreateRequest) {
        Club club = new Club();

            club.setAccount(accountUtils.getCurrentAccount());
            club.setName(clubCreateRequest.getName());
            club.setAddress(clubCreateRequest.getAddress());
            club.setPrice(clubCreateRequest.getPrice());

            club.setClose_time(LocalTime.of(clubCreateRequest.getEndHour(), clubCreateRequest.getEndMinute()));
            club.setOpen_time(LocalTime.of(clubCreateRequest.getStartHour(), clubCreateRequest.getStartMinute()));
            club.setPicture_location(clubCreateRequest.getPicture_location());
            return clubRepository.save(club);

    }

    public Club createClubCombo(ClubComboCreateRequest clubCreateRequest) {
        Account account= authenticationRepository.findAccountByEmail(clubCreateRequest.getEmail());
        Club club = new Club();
        club.setAccount(account);
        club.setName(clubCreateRequest.getName());
        club.setAddress(clubCreateRequest.getAddress());
        club.setPrice(clubCreateRequest.getPrice());
        club.setClose_time(LocalTime.of(clubCreateRequest.getEndHour(), clubCreateRequest.getEndMinute()));
        club.setOpen_time(LocalTime.of(clubCreateRequest.getStartHour(), clubCreateRequest.getStartMinute()));
        club.setPicture_location(clubCreateRequest.getPicture_location());
        club.setDeleted(true);
        return clubRepository.save(club);
    }

    public Club updateClub(ClubUpdateRequest clubUpdateRequest, Long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setName(clubUpdateRequest.getName());
        club.setAddress(clubUpdateRequest.getAddress());
        club.setPrice(clubUpdateRequest.getPrice());
        club.setClose_time(LocalTime.of(clubUpdateRequest.getEndHour(), clubUpdateRequest.getEndMinute()));
        club.setOpen_time(LocalTime.of(clubUpdateRequest.getStartHour(), clubUpdateRequest.getStartMinute()));
        club.setPicture_location(clubUpdateRequest.getPicture_location());
        return clubRepository.save(club);
    }

    public void deleteClub(Long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setDeleted(true);
        clubRepository.save(club);
    }
    public List<Club> getClubsByAddress(String address){
        List<Club> clubs= clubRepository.findAll();
        List<Club> clubList= new ArrayList<>();
        for(Club club: clubs){
            if(club.getAddress().toLowerCase().contains(address.toLowerCase())){
                clubList.add(club);
            }
        }
        return clubList;
    }

    public List<ClubResponse> findClubResponsesByAddress(String address) {
        List<ClubResponse> clubResponses = new ArrayList<>();
        List<Club> clubs = getClubsByAddress(address);
        for(Club club : clubs) {
            ClubResponse clubResponse = new ClubResponse();
            clubResponse.setName(club.getName());
            clubResponse.setAddress(club.getAddress());
            clubResponse.setPrice(club.getPrice());
            clubResponse.setOpen_time(club.getOpen_time());
            clubResponse.setClose_time(club.getClose_time());
            clubResponse.setOwnerName(club.getAccount().getFullName());
            clubResponse.setPicture_location(club.getPicture_location());
            clubResponses.add(clubResponse);
        }
        return clubResponses;
    }
    public List<LocalDate> convertDayOfWeekToDatesInMonth(DayOfWeek dayOfWeek, Month month, int year) {
        List<LocalDate> dates = new ArrayList<>();

        // Start from the first day of the specified month and year
        LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);

        // Find the first occurrence of the specified day of the week in the month
        int daysToAdd = dayOfWeek.getValue() - firstDayOfMonth.getDayOfWeek().getValue();
        if (daysToAdd < 0) {
            daysToAdd += 7;
        }

        // Get the first occurrence date
        LocalDate currentDate = firstDayOfMonth.plusDays(daysToAdd);

        // Add all occurrences of the specified day of the week within the month
        while (currentDate.getMonth() == month) {
            dates.add(currentDate);
            currentDate = currentDate.plusWeeks(1);  // Move to the next occurrence of the day of the week
        }

        return dates;
    }
}
