package com.divit.stockExchangeApp.controller;

import java.util.List;

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

import com.divit.stockExchangeApp.entities.Company;
import com.divit.stockExchangeApp.entities.StockExchange;
import com.divit.stockExchangeApp.exceptions.ResourceNotFoundException;
import com.divit.stockExchangeApp.services.StockExchangeService;


@RestController
@RequestMapping("/stock_exchanges")
@CrossOrigin(origins ="https://stock-market-application-divit.herokuapp.com")
public class StockExchangeController {
	
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@GetMapping(path = "")
	public ResponseEntity<List<StockExchange>> findAll()
	{
		return new ResponseEntity<List<StockExchange>>(stockExchangeService.findAll(), HttpStatus.OK);
	}
	
	// find stock exchange by id
	@GetMapping(path = "/id/{id}")
	public ResponseEntity<StockExchange> findById(@PathVariable Long id) throws ResourceNotFoundException
	{
		return new ResponseEntity<StockExchange>(stockExchangeService.findById(id),HttpStatus.OK);
	}
	
	// find stock exchange by name
	@GetMapping(path = "/name/{name}")
	public ResponseEntity<StockExchange> findByName(@PathVariable String name) throws ResourceNotFoundException
	{
		return new ResponseEntity<StockExchange>(stockExchangeService.findByName(name),HttpStatus.OK);
	}
	
	// create a new Stock Exchange
	@PostMapping(path = "")
	public ResponseEntity<StockExchange> addStockExchange(@RequestBody StockExchange stockExchange)
	{
		return new ResponseEntity<StockExchange>(stockExchangeService.addStockExchange(stockExchange), HttpStatus.CREATED);
	}
	
	// update a Stock Exchange
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<StockExchange> updateStockExchange(@PathVariable Long id, @RequestBody StockExchange stockExchange)
	{
		return new ResponseEntity<StockExchange>(stockExchangeService.updateStockExchange(id, stockExchange), HttpStatus.CREATED);
	}
	
	// get list of companies in Stock Exchange
	@GetMapping(path = "/{id}/companies")
	public ResponseEntity<List<Company>> getCompaniesStockExchange(@PathVariable Long id)
	{
		return new ResponseEntity<List<Company>>(stockExchangeService.findCompaniesByStockExchangeId(id), HttpStatus.OK);
	}
			
	
}
