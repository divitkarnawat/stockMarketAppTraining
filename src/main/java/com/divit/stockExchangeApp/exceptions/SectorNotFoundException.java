package com.divit.stockExchangeApp.exceptions;

public class SectorNotFoundException extends Throwable{

	private String message;

	public SectorNotFoundException(Long id) {
		super();
		this.message = "Sector not found for id = " + id;
	}
	
	
}