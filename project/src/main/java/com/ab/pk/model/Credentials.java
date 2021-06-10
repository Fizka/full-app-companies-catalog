package com.ab.pk.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class Credentials implements Serializable {
    public String login;
    public String pass;
}
