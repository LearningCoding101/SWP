package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Club;
import click.badcourt.be.model.request.ClubCreateRequest;
import click.badcourt.be.model.request.ClubUpdateRequest;
import click.badcourt.be.model.response.ClubResponse;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClubService {

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    AuthenticationRepository authenticationRepository;

    public List<ClubResponse> getAllClubs() {
        List<Club> clubs = clubRepository.findClubsByDeletedFalse();
        List<ClubResponse> clubCreateResponse = new ArrayList<>();
        for(Club club : clubs) {
            ClubResponse clubResponse = new ClubResponse();
            clubResponse.setId(club.getClub_id());
            clubResponse.setName(club.getName());
            clubResponse.setAddress(club.getAddress());
            clubResponse.setOpen_time(club.getOpen_time());
            clubResponse.setClose_time(club.getClose_time());
            clubResponse.setOnwerId(club.getAccount().getAccountId());
            clubResponse.setPicture_location(club.getPicture_location());
            clubCreateResponse.add(clubResponse);
        }
        return clubCreateResponse;
    }

    public Club createClub(ClubCreateRequest clubCreateRequest) {
        Club club = new Club();
        Account accountOptional = authenticationRepository.findAccountByEmail(clubCreateRequest.getEmail());
        if (accountOptional !=null) {
            club.setAccount(accountOptional);
            club.setName(clubCreateRequest.getName());
            club.setAddress(clubCreateRequest.getAddress());
            club.setClose_time(LocalTime.of(clubCreateRequest.getEndHour(), clubCreateRequest.getEndMinute()));
            club.setOpen_time(LocalTime.of(clubCreateRequest.getStartHour(), clubCreateRequest.getStartMinute()));
            club.setPicture_location(clubCreateRequest.getPicture_location());
            club.setDeleted(false);
            return clubRepository.save(club);
        }else{
            throw new IllegalArgumentException("CourtOwner does not exist");
        }
    }

    public Club updateClub(ClubUpdateRequest clubUpdateRequest, long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setName(clubUpdateRequest.getName());
        club.setAddress(clubUpdateRequest.getAddress());
        club.setClose_time(LocalTime.of(clubUpdateRequest.getEndHour(), clubUpdateRequest.getEndMinute()));
        club.setOpen_time(LocalTime.of(clubUpdateRequest.getStartHour(), clubUpdateRequest.getStartMinute()));
        club.setPicture_location(clubUpdateRequest.getPicture_location());
        return clubRepository.save(club);
    }

    public void deleteClub(long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setDeleted(true);
        clubRepository.save(club);
    }
}
