package click.badcourt.be.api;

import click.badcourt.be.entity.Club;
import click.badcourt.be.model.ClubRequest;
import click.badcourt.be.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/")
public class ClubApi {
    @Autowired
    ClubService clubService;
    @GetMapping("club")
    public ResponseEntity getAll(){
        List<Club> clubList= clubService.getAllClubs();
        return ResponseEntity.ok(clubList);
    }
    @PostMapping("club")
    public ResponseEntity addClub(@RequestBody ClubRequest clubRequest){
        Club newClub= clubService.createClub(clubRequest);
        return ResponseEntity.ok(newClub);
    }
    @PutMapping("club/{id}")
    public ResponseEntity updateClub(@RequestBody ClubRequest clubRequest, @PathVariable int id){
        Club club = clubService.updateClub(clubRequest, id);
        return ResponseEntity.ok(club);
    }
    @DeleteMapping("club/{id}")
    public ResponseEntity deleteClub(@PathVariable int id){
        clubService.deleteClub(id);
        return ResponseEntity.ok(id+"deleted");
    }
}
