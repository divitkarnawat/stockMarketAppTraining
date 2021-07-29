package com.divit.stockExchangeApp.services;

import java.util.List;

import com.divit.stockExchangeApp.entities.AppUser;

public interface AppUserService {

	AppUser addUser(AppUser appUser);

	String confirmUser(Long id);

	List<AppUser> findAll();

	AppUser findById(Long id);

	AppUser findByName(String username);

	

}
