package click.badcourt.be.repository;

import click.badcourt.be.entity.Club;
import click.badcourt.be.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRespository extends JpaRepository<FeedBack, Long> {
    List<Club> findFeedBacksByIsDeletedFalse();
}
