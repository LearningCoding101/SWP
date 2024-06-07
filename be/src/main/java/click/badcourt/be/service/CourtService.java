package click.badcourt.be.service;


import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.Court;
import click.badcourt.be.entity.FeedBack;
import click.badcourt.be.enums.CourtStatusEnum;
import click.badcourt.be.model.request.CourtCreateRequest;
import click.badcourt.be.model.request.CourtUpdateRequest;
import click.badcourt.be.model.response.CourtResponse;
import click.badcourt.be.model.response.CourtShowResponse;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourtService {
    @Autowired
    CourtRepository courtRepository;
    @Autowired
    ClubRepository clubRepository;
    public List<CourtShowResponse> getAllCourts() {
        List<Court> courts = courtRepository.findCourtsByDeletedFalse();
        List<CourtShowResponse> courtShowResponseList = new ArrayList<>();

        for (Court c : courts) {
            CourtShowResponse courtShowResponse = new CourtShowResponse();
            courtShowResponse.setStatus(c.getStatus());
            courtShowResponse.setPrice(c.getPrice());
            courtShowResponse.setId(c.getCourtId());
            courtShowResponse.setClubName(c.getClub().getName());

            courtShowResponseList.add(courtShowResponse);
        }

        return courtShowResponseList;
    }

    public Court createCourt (CourtCreateRequest courtCreateRequest){
        Court newCourt= new Court();
        Optional<Club> clubOptional= clubRepository.findById(courtCreateRequest.getClubId());
        if(clubOptional.isPresent()){
            newCourt.setClub(clubOptional.get());
            newCourt.setDeleted(false);
            newCourt.setPrice(courtCreateRequest.getPrice());
            newCourt.setStatus(CourtStatusEnum.AVAILABLE);
            return  courtRepository.save(newCourt);
        }else{
            throw new IllegalArgumentException("Club not found");
        }
    }
    public Court updateCourt (CourtUpdateRequest courtUpdateRequest,long id){

        Court court = courtRepository.findById(id).orElseThrow(()->new RuntimeException("Court not found"));



            court.setPrice(courtUpdateRequest.getPrice());
            court.setStatus(courtUpdateRequest.getStatus());
            return  courtRepository.save(court);

    }
    public void deleteCourt(Long courtId) {
        Court court = courtRepository.findById(courtId).orElseThrow(() -> new RuntimeException("Court not found"));
        court.setDeleted(true);
        courtRepository.save(court);
    }
}
