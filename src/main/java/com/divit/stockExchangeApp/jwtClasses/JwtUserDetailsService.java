package com.divit.stockExchangeApp.jwtClasses;

import java.util.ArrayList;
//add jwt.secret=abcd to application properties
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.divit.stockExchangeApp.entities.AppUser;
import com.divit.stockExchangeApp.exceptions.ResourceAlreadyExistsException;
import com.divit.stockExchangeApp.exceptions.ResourceNotFoundException;



@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	Userrepository appUserRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	public Collection<? extends GrantedAuthority> getAuthorities() {
	       
		com.divit.stockExchangeApp.jwtClasses.User1 user = new com.divit.stockExchangeApp.jwtClasses.User1() ;
   
   List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    
   
       authorities.add(new SimpleGrantedAuthority(user.getRole()));
  
    
   return authorities;
}
	@Override
	public UserDetails1 loadUserByUsername(String username) throws UsernameNotFoundException {
		com.divit.stockExchangeApp.jwtClasses.User1 user = appUserRepository.findByName(username);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	//non dto code below	//return new org.springframework.security.core.userdetails.User(user.getname(), user.getpassword(),
			//	new ArrayList<>());
		return new UserDetails1(user);//you have to implement userdetails if you dont want to use dto
	}

//implement without dto	public com.stockexchange.phase3.User1 save(UserDto user) {
	public com.divit.stockExchangeApp.jwtClasses.User1 save(User1 user) {
		com.divit.stockExchangeApp.jwtClasses.User1 newUser = new com.divit.stockExchangeApp.jwtClasses.User1();
		//newUser.setname(user.getUsername());
		//newUser.setpassword(bcryptEncoder.encode(user.getPassword()));
	    
		if(appUserRepository.existsByName(user.getname()))
		{
			throw new ResourceAlreadyExistsException("User", user.getname());
		}
		
		newUser.setConfirmed(false);
		newUser.setname(user.getname());
	    newUser.setpassword(bcryptEncoder.encode(user.getpassword()));
	    newUser.setemail(user.getemail());
		newUser.setRole(user.getRole());
		newUser.setAdmin(user.getAdmin());
		newUser.setMobileNumber(user.getMobileNumber());
		com.divit.stockExchangeApp.jwtClasses.User1 userSaved = appUserRepository.save(newUser);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "UserController");
		headers.add("Access-Control-Allow-Origin", "*");
		try {
			sendemail((Long) userSaved.getId());
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userSaved;
	}
	
	public void sendemail(Long userid) throws AddressException, MessagingException {

	      User1 appUser = appUserRepository.getById(userid);	

			final String username = "divitkarnawat1@gmail.com";
			final String password = "23Pmsdkarnawat";

			Properties prop = new Properties();
			prop.put("mail.smtp.host", "smtp.gmail.com");
			prop.put("mail.smtp.port", "465");
			prop.put("mail.smtp.auth", "true");
			prop.put("mail.smtp.starttls.enable", "true");
			prop.put("mail.smtp.starttls.required", "true");
			prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
			prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

			Session session = Session.getInstance(prop,
					new javax.mail.Authenticator() {
				protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
					return new javax.mail.PasswordAuthentication(username, password);
				}
			});

			try {

				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress("sftrainerram@gmail.com"));
				//message.setRecipients(
					//	Message.RecipientType.TO,
					//	InternetAddress.parse("sftrainerram@gmail.com")
					//	);
				message.setRecipients(
						Message.RecipientType.TO,
						InternetAddress.parse(appUser.getemail())
						);
				message.setSubject("USer confirmation email");
				//     message.setText("Dear Mail Crawler,"
				//           + "\n\n Please do not spam my email!");
				message.setContent(
						"<h1><a href =\"http://localhost:3000/confirmuser/"+userid+"/\"> Click to confirm </a></h1>",
						"text/html");
				Transport.send(message);

				System.out.println("Done");

			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}


	
	public String confirmUser(Long id) {
		Optional<User1> userlist =   appUserRepository.findById(id);
		if(!userlist.isPresent())
		{
			throw new ResourceNotFoundException("User", id);
		}
		User1 user = userlist.get();
		user.setConfirmed(true);
		appUserRepository.save(user);
		return "Confirmed";
	}
	public User1 findById(Long id) {
		
		return appUserRepository.findById(id).get();
	}
	public User1 updateUser(Long id,Map<String, String> udet) {
		User1 user = appUserRepository.findById(id).get();
		user.setemail(udet.get("email"));
		user.setMobileNumber(udet.get("mobileNumber"));
		return appUserRepository.save(user);
	}




	}