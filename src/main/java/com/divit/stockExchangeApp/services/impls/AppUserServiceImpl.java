package com.divit.stockExchangeApp.services.impls;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.divit.stockExchangeApp.entities.AppUser;
import com.divit.stockExchangeApp.exceptions.ResourceAlreadyExistsException;
import com.divit.stockExchangeApp.exceptions.ResourceNotFoundException;
import com.divit.stockExchangeApp.repositories.AppUserRepository;
import com.divit.stockExchangeApp.services.AppUserService;


@Service
public class AppUserServiceImpl implements AppUserService{

	@Autowired
	private AppUserRepository appUserRepository;
	
	@Override
	public AppUser addUser(AppUser appUser) {
		
		if(appUserRepository.existsByUsername(appUser.getUsername()))
		{
			throw new ResourceAlreadyExistsException("User", appUser.getUsername());
		}
		appUser.setConfirmed(false);
		AppUser userSaved = appUserRepository.save(appUser);
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

	      AppUser appUser = appUserRepository.getById(userid);	

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
						InternetAddress.parse(appUser.getEmail())
						);
				message.setSubject("USer confirmation email");
				//     message.setText("Dear Mail Crawler,"
				//           + "\n\n Please do not spam my email!");
				message.setContent(
						"<h1><a href =\"http://localhost:8080/users/confirmuser/"+userid+"/\"> Click to confirm </a></h1>",
						"text/html");
				Transport.send(message);

				System.out.println("Done");

			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}

	@Override
	public String confirmUser(Long id) {
		Optional<AppUser> userlist =   appUserRepository.findById(id);
		//do a null check for home work
		AppUser usr = new AppUser();
		usr = appUserRepository.getById(id);
		usr.setConfirmed(true);
		appUserRepository.save(usr);
		return "User confirmed" +usr.getUsername();
	}

	@Override
	public List<AppUser> findAll() {
		return appUserRepository.findAll();
	}

	@Override
	public AppUser findById(Long id) {
		return  appUserRepository.findById(id).map(appUser -> appUser )
				.orElseThrow(()->new ResourceNotFoundException("User", id));
	}


	@Override
	public AppUser findByName(String name) {
		return  appUserRepository.findByUsername(name).map(appUser -> appUser )
				.orElseThrow(()->new ResourceNotFoundException("User", name));
	}
	
	
}
