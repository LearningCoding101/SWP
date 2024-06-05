package click.badcourt.be.api;

import click.badcourt.be.entity.Club;
import click.badcourt.be.model.request.ClubCreateRequest;
import click.badcourt.be.model.request.ClubUpdateRequest;
import click.badcourt.be.model.response.ClubResponse;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class ClubApi {
    @Autowired
    ClubService clubService;

    @GetMapping("club")
    public ResponseEntity getAll(){
        return ResponseEntity.ok(clubService.getAllClubs());
    }
    @PostMapping("club")
    public ResponseEntity addClub(@RequestBody ClubCreateRequest clubCreateRequest){
        try {
            Club createdClub = clubService.createClub(clubCreateRequest);
            return new ResponseEntity<>(createdClub, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping("club/{id}")
    public ResponseEntity updateClub(@RequestBody ClubUpdateRequest clubUpdateRequest, @PathVariable int id){
        try {
            Club updatedClub = clubService.updateClub(clubUpdateRequest, id);
            ClubResponse club= new ClubResponse();
            club.setId(updatedClub.getClub_id());
            club.setName(updatedClub.getName());
            club.setAddress(updatedClub.getAddress());
            club.setClose_time(updatedClub.getClose_time());
            club.setOpen_time(updatedClub.getOpen_time());
            club.setPicture_location(updatedClub.getPicture_location());
            club.setOnwerId(updatedClub.getAccount().getAccountId());
            return  ResponseEntity.ok(club);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("club/{id}")
    public ResponseEntity deleteClub(@PathVariable int id){
        clubService.deleteClub(id);
        return ResponseEntity.ok( "courtID :"+id +" is deleted");
    }
}
