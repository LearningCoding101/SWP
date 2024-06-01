package click.badcourt.be.service;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Club;
import click.badcourt.be.model.request.ClubRequest;
import click.badcourt.be.repository.AuthenticationRepository;
import click.badcourt.be.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;

    public List<Club> getAllClubs() {
        return clubRepository.findClubsByDeletedFalse();
    }
    public Club createClub(ClubRequest clubRequest) {
        Club club = new Club();
        Optional<Account> accountOptional = Optional.ofNullable(authenticationRepository.findAccountByEmail(clubRequest.getEmail()));
        if (accountOptional.isPresent()){
            club.setAccount(accountOptional.get());
        }
        else{
            return null;
        }
        club.setName(clubRequest.getName());
        club.setAddress(clubRequest.getAddress());
        club.setClose_time(clubRequest.getClose_time());
        club.setOpen_time(clubRequest.getOpen_time());
        club.setPicture_location(clubRequest.getPicture_location());
        club.setDeleted(false);
        return clubRepository.save(club);
    }
    public Club updateClub(ClubRequest clubRequest, long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setName(clubRequest.getName());
        club.setAddress(clubRequest.getAddress());
        club.setClose_time(clubRequest.getClose_time());
        club.setOpen_time(clubRequest.getOpen_time());
        club.setPicture_location(clubRequest.getPicture_location());
        return clubRepository.save(club);
    }
    public void deleteClub(long id) {
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("Club not found"));
        club.setDeleted(true);
        clubRepository.save(club);
    }
}
