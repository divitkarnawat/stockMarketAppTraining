package com.divit.nonJWT.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException() {
        super();
    }
    
    public ResourceNotFoundException(String resource, String name) {
        super(resource + " not found with name = " + name);
    }
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id = " + id);
    }

}