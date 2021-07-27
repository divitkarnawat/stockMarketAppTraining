package com.divit.nonJWT.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CustomBadCredentialsException extends RuntimeException {
	public CustomBadCredentialsException() {
        super("Invalid Credentials");
    }
	
}
