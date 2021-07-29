package com.divit.stockExchangeApp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.divit.stockExchangeApp.entities.Company;
import com.divit.stockExchangeApp.entities.Companystockexchangemap;
import com.divit.stockExchangeApp.repositories.CompanyStockExchangeMapRepository;
import com.divit.stockExchangeApp.services.CompanyStockExchangeMapService;

@RestController
@CrossOrigin(origins ="https://stock-market-application-divit.herokuapp.com")
public class CompanyStockExchangeMapController {
	
	@Autowired
	private CompanyStockExchangeMapService companyStockExchangeMapService;
	
	@Autowired
	private CompanyStockExchangeMapRepository companyStockExchangeMapRepository;
	
	@GetMapping(path = "/mapCompStock")
	public ResponseEntity<List<Companystockexchangemap>> findAll()
	{
		return new ResponseEntity<List<Companystockexchangemap>>(companyStockExchangeMapRepository.findAll(), HttpStatus.OK);
	}
	
	@PostMapping(path = "/mapCompStock")
	public  ResponseEntity<Void> mapCompanyStockExchange(@RequestBody Map<String, String> details) 
	{
		companyStockExchangeMapService.mapCompanyStockExchange(details);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
//	@GetMapping(path = "/testing")
//	public ResponseEntity<Company> findTest()
//	{
//		return new ResponseEntity<Company>(companyStockExchangeMapRepository.findByCompanyCodeAndStockExchangeId("500112",28L).getCompany(), HttpStatus.OK);
//	}
}
