package com.ab.pk.exception;

public class CatalogPageNotFoundException extends RuntimeException {

    public CatalogPageNotFoundException(Long id) {
        super("Could not find catalog page " + id);
    }
}
