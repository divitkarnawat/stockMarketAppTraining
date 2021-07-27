package com.divit.nonJWT.jwtClasses;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private boolean admin;
	private Long userId;
	
	public JwtResponse(String jwttoken, boolean admin, Long userId) {
		this.jwttoken = jwttoken;
		this.admin = admin;
		this.userId = userId;
	}

	public String getToken() {
		return this.jwttoken;
	}
	public boolean getAdmin() {
		return this.admin;
	}
	public Long getUserId()
	{
		return this.userId;
	}
	
}