package com.ab.pk.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Response implements Serializable {
    private int status;
    private String message;
    private Date time;
    private List<String> errors;

    public Response(int status, String message) {
        this.status = status;
        this.message = message;
        this.time = new Date(System.currentTimeMillis());
    }
}
