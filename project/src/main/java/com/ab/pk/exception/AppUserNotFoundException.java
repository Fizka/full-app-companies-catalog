package com.ab.pk.exception;

public class AppUserNotFoundException extends RuntimeException {

    public AppUserNotFoundException(Long id) {
        super("Could not find appUser " + id);
    }
}
