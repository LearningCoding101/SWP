package click.badcourt.be.api;

import click.badcourt.be.entity.Account;
import click.badcourt.be.entity.Club;
import click.badcourt.be.model.request.ClubComboCreateRequest;
import click.badcourt.be.model.request.ClubCreateRequest;
import click.badcourt.be.model.request.ClubUpdateRequest;
import click.badcourt.be.model.response.ClubResponse;
import click.badcourt.be.repository.ClubRepository;
import click.badcourt.be.service.AuthenticationService;
import click.badcourt.be.service.ClubService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/")
@SecurityRequirement(name = "api")
public class ClubApi {
    @Autowired
    ClubService clubService;
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("clubs")
    public ResponseEntity getAll(){
        return ResponseEntity.ok(clubService.getAllClubs());
    }
    @GetMapping("club")
    public ResponseEntity<?> getClubOnClubOwnerPage(){
        try{
        return ResponseEntity.ok(clubService.getClubByCurrentAccount());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("club/{address}")
    public ResponseEntity getClub(@PathVariable("address") String address){
        return ResponseEntity.ok(clubService.findClubResponsesByAddress(address));
    }
//    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("club")
    public ResponseEntity addClub(@RequestBody ClubCreateRequest clubCreateRequest){
        try {
            Club createdClub = clubService.createClub(clubCreateRequest);
            return new ResponseEntity<>(createdClub, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("clubCombo")
    public ResponseEntity addClubcombo(@RequestBody ClubComboCreateRequest clubComboCreateRequest){
        try {
            HashMap<String, Object> hmap = new HashMap<String, Object>();
            Account account= authenticationService.registerClubOwner(clubComboCreateRequest);
            Club createdClub = clubService.createClubCombo(clubComboCreateRequest);
            hmap.put("createdClub", createdClub);
            hmap.put("account", account);
            return new ResponseEntity<HashMap<String, Object>>(hmap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("club/{id}")
    public ResponseEntity updateClub(@RequestBody ClubUpdateRequest clubUpdateRequest, @PathVariable Long id){
        try {
            Club updatedClub = clubService.updateClub(clubUpdateRequest, id);
            ClubResponse club= new ClubResponse();
            club.setName(updatedClub.getName());
            club.setAddress(updatedClub.getAddress());
            club.setClose_time(updatedClub.getClose_time());
            club.setOpen_time(updatedClub.getOpen_time());
            club.setPicture_location(updatedClub.getPicture_location());
            club.setOwnerName(updatedClub.getAccount().getFullName());
            return  ResponseEntity.ok(club);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("club/{id}")
    public ResponseEntity deleteClub(@PathVariable Long id){
        clubService.deleteClub(id);
        return ResponseEntity.ok( "courtID :"+id +" is deleted");
    }
}
