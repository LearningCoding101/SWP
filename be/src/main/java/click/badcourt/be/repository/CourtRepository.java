package click.badcourt.be.repository;


import click.badcourt.be.entity.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourtRepository extends JpaRepository<Court,Long> {
    List<Court> findCourtsByDeletedFalse();
    Optional<Court> findByIdAndDeletedFalse(Long id);
    Optional<Court> findCourtByDeletedFalseAndCourtId(Long courtId);

}
