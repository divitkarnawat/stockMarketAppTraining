package com.divit.stockExchangeApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divit.stockExchangeApp.entities.AppUser;
import com.divit.stockExchangeApp.services.AppUserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins ="http://localhost:3000")
public class AppUserController {
	
	@Autowired
	private AppUserService appUserService;
	
	@PostMapping(path = "")
	public ResponseEntity<AppUser> addUser(@RequestBody AppUser appUser)
	{
		return new ResponseEntity<AppUser>(appUserService.addUser(appUser), HttpStatus.CREATED);
	}
	
	@GetMapping(path = "/confirmation/{id}")
	public ResponseEntity<String> confirmUser(@PathVariable Long id)
	{
		return new ResponseEntity<String>(appUserService.confirmUser(id), HttpStatus.OK);
	}
	
	@GetMapping(path = "")
	public ResponseEntity<List<AppUser>> getAppUsers()
	{
		return new ResponseEntity<List<AppUser>>(appUserService.findAll(),HttpStatus.OK);
	}
	
	@GetMapping(path = "/id/{id}")
	public ResponseEntity<AppUser> getAppUserById(@PathVariable Long id)
	{
		return new ResponseEntity<AppUser>(appUserService.findById(id),HttpStatus.OK);
	}
	
	@GetMapping(path = "/username/{username}")
	public ResponseEntity<AppUser> getAppUserByName(@PathVariable String username)
	{
		return new ResponseEntity<AppUser>(appUserService.findByName(username),HttpStatus.OK);
	}
}
