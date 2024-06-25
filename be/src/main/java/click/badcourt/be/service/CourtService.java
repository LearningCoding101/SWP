package click.badcourt.be.service;

import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.Court;
import click.badcourt.be.model.request.CourtCreateRequest;
import click.badcourt.be.model.request.CourtCreateRequestCombo;
import click.badcourt.be.model.request.CourtUpdateRequest;
import click.badcourt.be.model.response.CourtNameListShowResponse;
import click.badcourt.be.model.response.CourtShowResponse;
import click.badcourt.be.model.response.CourtShowResponseCombo;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.repository.CourtRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class CourtService {

    @Autowired
    CourtRepository courtRepository;

    @Autowired
    ClubRepository clubRepository;
    @Autowired
    private CourtTimeSlotService courtTimeSlotService;


    public List<CourtShowResponse> getCourtsByClubId(Long clubId) {

        if (!clubRepository.existsById(clubId)) {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }

        List<Court> allCourts = courtRepository.findCourtsByDeletedFalse();
        List<CourtShowResponse> courts = new ArrayList<>();

        for (Court court : allCourts) {
            if (court.getClub().getClubId() == clubId) {
                CourtShowResponse courtShowResponse = new CourtShowResponse();
                courtShowResponse.setId(court.getCourtId());
                courtShowResponse.setCourtName(court.getCourtname());
                courtShowResponse.setClubId(court.getClub().getClubId());
                courtShowResponse.setDeleted(court.isDeleted());
                courtShowResponse.setClubName(court.getClub().getName());
                courts.add(courtShowResponse);
            }
        }

        return courts;
    }

    public List<CourtNameListShowResponse> getCourtNamesByClubId(Long clubId) {
        if (!clubRepository.existsById(clubId)) {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }
        List<Court> allCourts = courtRepository.findCourtsByDeletedFalse();
        List<CourtNameListShowResponse> courts = new ArrayList<>();

        for (Court court : allCourts) {
            if (court.getClub().getClubId() == clubId) {
                CourtNameListShowResponse courtNameListShowResponse = new CourtNameListShowResponse();
                courtNameListShowResponse.setId(court.getCourtId());
                courtNameListShowResponse.setCourtName(court.getCourtname());
                courts.add(courtNameListShowResponse);
            }
        }

        return courts;
    }


    public CourtShowResponse createCourt(CourtCreateRequest courtCreateRequest, Long clubId) {
        Court newCourt = new Court();
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        if (clubOptional.isPresent()&&!clubOptional.get().isDeleted()) {
            newCourt.setClub(clubOptional.get());
            newCourt.setCourtname(courtCreateRequest.getCourtName());
            Court savedCourt= courtRepository.save(newCourt);
            CourtShowResponse response= new CourtShowResponse();
            response.setId(savedCourt.getCourtId());
            response.setCourtName(savedCourt.getCourtname());
            response.setClubId(savedCourt.getClub().getClubId());
            response.setClubName(savedCourt.getClub().getName());
            response.setDeleted(false);
            return response;
        } else {
            throw new IllegalArgumentException("Club not found with id: " + clubId);
        }
    }

    public List<CourtShowResponseCombo> createManyCourt(Long clubId, CourtCreateRequestCombo combo) {
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        int b = courtRepository.countCourtsByDeletedFalseAndClub_ClubId(clubId);

        b++;
        int t = 1;
        List<CourtShowResponseCombo> response = new ArrayList<>();
        if (clubOptional.isPresent()&&!clubOptional.get().isDeleted()) {
            for (int i = b; t <= combo.getNumberofcourt(); i++) {
                Court newCourt = new Court();
                newCourt.setClub(clubOptional.get());
                newCourt.setCourtname(String.valueOf(i));
                Court savedCourt = courtRepository.save(newCourt);
                CourtShowResponseCombo addResponse= new CourtShowResponseCombo();
                for(Long e : combo.getTSId()) {
                    courtTimeSlotService.createCourtTimeSlotCombo(savedCourt.getCourtId(), e);
                }
                addResponse.setClubId(savedCourt.getClub().getClubId());
                addResponse.setCId(savedCourt.getCourtId());
                addResponse.setCourtName(savedCourt.getCourtname());
                response.add(addResponse);
                t++;
            }
            return response;
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
