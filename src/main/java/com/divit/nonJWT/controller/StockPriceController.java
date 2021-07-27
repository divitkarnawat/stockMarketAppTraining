package com.divit.nonJWT.controller;

import java.util.List;
import java.util.Map;
import java.util.Vector;

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

import com.divit.nonJWT.entities.StockPrice;
import com.divit.nonJWT.services.StockPriceService;

@RestController
@RequestMapping("/stock_prices")
@CrossOrigin(origins ="http://localhost:3000")
public class StockPriceController {
	
	@Autowired
	private StockPriceService stockPriceService;
	
	
	// get companies list
	@GetMapping(path = "")
	public ResponseEntity<List<StockPrice>> findAll()
	{	
		return new ResponseEntity<List<StockPrice>>(stockPriceService.findAll(), HttpStatus.OK);
	}
		
	// get company by id
	@GetMapping(path = "/id/{id}")
	public ResponseEntity<StockPrice> findById(@PathVariable Long id)
	{
		return new ResponseEntity<StockPrice>(stockPriceService.findById(id), HttpStatus.OK);
	}
	
	// add stock prices
	@PostMapping(path = "")
	public ResponseEntity<String> addStockPrices(@RequestBody Map<String,Vector<Vector<String>>> stockPriceDataList)
	{
		stockPriceService.addStockPrices(stockPriceDataList);
		return new ResponseEntity<String>("Added Stock Prices", HttpStatus.CREATED);
	}
	
	// update stock price
	@PutMapping(path = "/{id}")
	public ResponseEntity<StockPrice> updateStockPrice(@PathVariable Long id, @RequestBody StockPrice stockPrice)
	{
		return new ResponseEntity<StockPrice>(stockPriceService.updateStockPrice(id, stockPrice), HttpStatus.OK);
	}
	
	@PostMapping(path = "/getStockPriceForCompanyChart")
	public ResponseEntity<List<StockPrice>> getStockPriceForCompanyChart(@RequestBody Map<String, String> req_details)
	{
		return new ResponseEntity<List<StockPrice>>(stockPriceService.getStockPriceForCompanyChart(req_details), HttpStatus.OK);
	}
		
	@PostMapping(path = "/getStockPriceForSectorChart")
	public ResponseEntity<List<StockPrice>> getStockPriceForSectorChart(@RequestBody Map<String, String> req_details)
	{
		return new ResponseEntity<List<StockPrice>>(stockPriceService.getStockPriceForSectorChart(req_details), HttpStatus.OK);
	}
	
	
	
}
