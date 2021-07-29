package com.divit.stockExchangeApp.jwtClasses;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.divit.stockExchangeApp.exceptions.CustomBadCredentialsException;
import com.divit.stockExchangeApp.exceptions.ResourceAlreadyExistsException;

@RestController
@CrossOrigin(origins ="https://stock-market-application-divit.herokuapp.com")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	// without dto below public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
	public ResponseEntity<?> saveUser(@RequestBody User1 user) throws Exception {
//USer1 is your user pojo entity 
		
		return ResponseEntity.ok(userDetailsService.save(user));
	}
//if not using dto ,then for register name and not user name
	//user username for authenticate but
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST,headers = "Accept=application/json")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails1 userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		if(!userDetails.getConfirmed()) {
			throw new ResourceAlreadyExistsException("Kindly confirm by clicking on link sent to " + userDetails.getEmail());
		}
		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token, userDetails.getAdmin(), userDetails.getUserId()));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new CustomBadCredentialsException();
		}
	}
	
	@GetMapping(path = "/confirmUser/{id}")
	public ResponseEntity<String> confirmUser(@PathVariable Long id)
	{
		return new ResponseEntity<String>(userDetailsService.confirmUser(id), HttpStatus.OK);
	}
	
	@GetMapping(path = "/user_details/{id}")
	public ResponseEntity<User1> getUserById(@PathVariable String id)
	{
		return new ResponseEntity<User1>(userDetailsService.findById(Long.parseLong(id)), HttpStatus.OK);
	}
	
	@PutMapping(path = "/user_details/update/{id}")
	public ResponseEntity<User1> updateUser(@PathVariable Long id,@RequestBody Map<String, String> udet)
	{
		return new ResponseEntity<User1>(userDetailsService.updateUser(id,udet), HttpStatus.OK);
	}
	
}