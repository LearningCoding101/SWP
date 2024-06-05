package click.badcourt.be.repository;

import click.badcourt.be.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRespository extends JpaRepository<FeedBack, Long> {
}
