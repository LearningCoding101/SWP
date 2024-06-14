package click.badcourt.be.service;

import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.Court;
import click.badcourt.be.model.request.CourtCreateRequest;
import click.badcourt.be.model.request.CourtUpdateRequest;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.repository.CourtRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class CourtService {

    @Autowired
    CourtRepository courtRepository;

    @Autowired
    ClubRepository clubRepository;

//    public List<CourtShowResponse> getAllCourts() {
//        List<Court> courts = courtRepository.findCourtsByDeletedFalse();
//        List<CourtShowResponse> courtShowResponseList = new ArrayList<>();
//
//        for (Court c : courts) {
//            CourtShowResponse courtShowResponse = new CourtShowResponse();
//            courtShowResponse.setPrice(c.getPrice());
//            courtShowResponse.setId(c.getCourtId());
//            courtShowResponse.setClubName(c.getClub().getName());
//
//            courtShowResponseList.add(courtShowResponse);
//        }
//
//        return courtShowResponseList;
//    }

    public List<Court> getCourtsByClubId(Long clubId) {

        if (!clubRepository.existsById(clubId)) {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }


        List<Court> allCourts = courtRepository.findCourtsByDeletedFalse();


        List<Court> courts = new ArrayList<>();
        for (Court court : allCourts) {
            if (court.getClub().getClubId() == clubId) {
                courts.add(court);
            }
        }

        return courts;
    }

    public Court createCourt(CourtCreateRequest courtCreateRequest, Long clubId) {
        Court newCourt = new Court();
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        if (clubOptional.isPresent()&&!clubOptional.get().isDeleted()) {
            newCourt.setClub(clubOptional.get());
            newCourt.setCourtname(courtCreateRequest.getCourtName());
            return courtRepository.save(newCourt);
        } else {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }
    }


    public Court updateCourt (CourtUpdateRequest courtUpdateRequest, Long id){
        Court court = courtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Court not found"));

        if (court.isDeleted()) {
            throw new RuntimeException("Court has been deleted");
        }

        court.setCourtname(courtUpdateRequest.getCourtname());
        return courtRepository.save(court);
    }


    public void deleteCourt(Long courtId) {
        Court court = courtRepository.findById(courtId).orElseThrow(() -> new RuntimeException("Court not found"));
        court.setDeleted(true);
        courtRepository.save(court);
    }
}
