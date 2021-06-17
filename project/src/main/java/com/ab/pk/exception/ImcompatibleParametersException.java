package com.ab.pk.exception;

public class ImcompatibleParametersException extends RuntimeException {

    public ImcompatibleParametersException() {
        super("Could not find parameters");
    }
}
