package com.divit.nonJWT.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException() {
        super();
    }
    
    public ResourceAlreadyExistsException(String resource, String name) {
        super(resource + " already exists with name = " + name);
    }
    public ResourceAlreadyExistsException(String resource, Long id) {
        super(resource + " already exists with id = " + id);
    }
    public ResourceAlreadyExistsException(String error_msg) {
        super(error_msg);
    }
    

}