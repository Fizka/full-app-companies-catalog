package com.ab.pk.model;

import com.ab.pk.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity(name = "AppUser")
public class AppUser implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAppUser;

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    protected String password;

    @Column(name = "role")
    private String role = "USER";

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "favorite")
    private String favorite;

    @Enumerated(EnumType.ORDINAL)
    private UserStatus status = UserStatus.ACTIVE;

    public AppUser(String login, String password, String role, String username, String firstname, String lastname, UserStatus status) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.status = status;
    }
}
