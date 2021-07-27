package com.divit.nonJWT.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.IPODetail;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.entities.StockPrice;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.services.CompanyService;
import com.divit.nonJWT.services.StockPriceService;

@RestController
@RequestMapping("/companies")
@CrossOrigin(origins ="http://localhost:3000")
public class CompanyController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private StockPriceService stockPriceService;
	
	
	// get companies list
	@GetMapping(path = "")
	public ResponseEntity<List<Company>> findAll()
	{
		return new ResponseEntity<List<Company>>(companyService.findAll(), HttpStatus.OK);
	}
		
	// get company by id
	@GetMapping(path = "/id/{id}")
	public ResponseEntity<Company> findById(@PathVariable Long id)
	{
		return new ResponseEntity<Company>(companyService.findById(id), HttpStatus.OK);
	}
	
	// get company by name
	@GetMapping(path = "/name/{name}")
	public ResponseEntity<Company> findByName(@PathVariable String name) throws ResourceNotFoundException
	{
		return new ResponseEntity<Company>(companyService.findByName(name), HttpStatus.OK);
	}
	
	// get company by pattern
	@GetMapping(path = "/pattern/{pattern}")
	public ResponseEntity<List<Company>> findByNamePattern(@PathVariable String pattern)
	{
		return new ResponseEntity<List<Company>>(companyService.findByNamePattern(pattern), HttpStatus.OK);
	}
	

	
	// add a new company
	@PostMapping(path = "")
	public ResponseEntity<Company> addCompany(@RequestBody Company company)
	{
		return new ResponseEntity<Company>(companyService.addCompany(company), HttpStatus.CREATED);
	}
	
	//update company details
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company companyUpdate)
	{
		return new ResponseEntity<Company>(companyService.updateCompany(id, companyUpdate),HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}/isIPOAdded")
	public ResponseEntity<List<Long>> isIPOAdded(@PathVariable Long id)
	{
		return new ResponseEntity<List<Long>>(companyService.isIPOAdded(id), HttpStatus.OK);
	}
	
	// get ipo details of a company
	@GetMapping(path = "/{id}/ipo_details")
	public ResponseEntity<IPODetail> getCompanyIPODetails(@PathVariable Long id)
	{
		return new ResponseEntity<IPODetail>(companyService.findCompanyIPODetail(id), HttpStatus.OK);
	}
	
	// add IPO
	@PostMapping(path = "/{id}/ipo")
	public ResponseEntity<IPODetail> add(@PathVariable Long id, @RequestBody IPODetail ipoDetail)
	{
		return new ResponseEntity<IPODetail>(companyService.addIPO(id, ipoDetail), HttpStatus.OK);
	}
	
	
	// get list of stock exchanges
	@GetMapping(path = "/{id}/stock_exchanges")
	public ResponseEntity<List<StockExchange>> getCompanyStockExchanges(@PathVariable Long id)
	{
		return new ResponseEntity<List<StockExchange>>(companyService.findCompanyStockExchanges(id), HttpStatus.OK);
	}
	
	// get list of stock price
	@GetMapping(path = "/{id}/stock_prices")
	public ResponseEntity<List<StockPrice>> getCompanyStockPrices(@PathVariable Long id)
	{
		return new ResponseEntity<List<StockPrice>>(stockPriceService.findCompanyStockPrices(id), HttpStatus.OK);
	}
	
	

}
