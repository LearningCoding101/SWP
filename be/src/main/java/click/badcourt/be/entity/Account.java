package click.badcourt.be.entity;

import click.badcourt.be.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto generate id
    long id;
    String password;
    String phone;
    boolean isDeleted;

    @Enumerated(EnumType.STRING)
    RoleEnum role;


}
