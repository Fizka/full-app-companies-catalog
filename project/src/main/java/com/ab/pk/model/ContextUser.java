package com.ab.pk.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ContextUser implements Serializable {

    private int id;
    private String login;
    private String pass;
    private String role;

    public ContextUser(String login, String pass, String role) {
        this.login = login;
        this.pass = pass;
        this.role = role;
    }

}
