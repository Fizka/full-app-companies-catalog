package com.ab.pk.model;

import com.ab.pk.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class Credentials implements Serializable {
    private Long idAppUser;
    private String login;
    protected String password;
    private String role;
    private String username;
    private String firstname;
    private String lastname;
    private List<Integer> favorite;
    private UserStatus status;
}
