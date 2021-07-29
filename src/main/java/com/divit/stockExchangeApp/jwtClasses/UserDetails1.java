package com.divit.stockExchangeApp.jwtClasses;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
//this class is required if your not using DTO and directly accessing
// the user pojo class
public class UserDetails1 implements UserDetails {
    private User1 user;

    public UserDetails1(User1 user) {
        this.user = user;
        
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getpassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getname();
	}
	
	
	public boolean getConfirmed()
	{
		return user.getConfirmed();
	}
	
	public boolean getAdmin()
	{
		return user.getAdmin();
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public String getEmail() {
		// TODO Auto-generated method stub
		return user.getemail();
	}

	public Long getUserId() {
		return user.getId();
	}
    
}