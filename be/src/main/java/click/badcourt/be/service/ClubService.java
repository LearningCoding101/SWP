package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Club;
import click.badcourt.be.model.request.ClubCreateRequest;
import click.badcourt.be.model.request.ClubUpdateRequest;
import click.badcourt.be.model.response.ClubResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClubService {

    @Autowired
    ClubRepository clubRepository;
    @Autowired
    AccountUtils accountUtils;
    @Autowired
    AuthenticationRepository authenticationRepository;

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
}
