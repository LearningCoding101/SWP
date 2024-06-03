package click.badcourt.be.entity;

import click.badcourt.be.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto generate id
    @Column(name = "account_id")
    long accountId;

    String password;
    @Column(unique = true)
    String phone;
    @Column(unique = true)
    String email;
    String fullName;
    boolean isDeleted;

    @OneToMany(mappedBy = "account")
    List<Booking> bookings;

    @OneToOne(mappedBy = "account")
    Club club;

    @Enumerated(EnumType.STRING)
    RoleEnum role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
