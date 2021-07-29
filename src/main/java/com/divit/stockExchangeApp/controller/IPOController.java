package com.divit.stockExchangeApp.controller;

import java.util.List;
import java.util.Map;

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

import com.divit.stockExchangeApp.entities.IPODetail;
import com.divit.stockExchangeApp.services.IPOService;

@RestController
@RequestMapping("/ipo_details")
@CrossOrigin(origins ="https://stock-market-application-divit.herokuapp.com")
public class IPOController {
	
	@Autowired
	private IPOService ipoService;
	
	
	@GetMapping(path = "")
	public ResponseEntity<List<IPODetail>> findIPOs()
	{
		return new ResponseEntity<List<IPODetail>>(ipoService.findIPOs(), HttpStatus.OK);
	}
	@GetMapping(path = "/{id}")
	public ResponseEntity<IPODetail> findIPODetail(@PathVariable Long id)
	{
		return new ResponseEntity<IPODetail>(ipoService.findById(id), HttpStatus.OK);
	}
	
	@PutMapping(path = "/{id}")
	public ResponseEntity<IPODetail> updateIPODetail(@PathVariable Long id, @RequestBody IPODetail ipoDetail)
	{
		return new ResponseEntity<IPODetail>(ipoService.update(id, ipoDetail), HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}/stock_exchanges")
	public ResponseEntity<List<String>> findStockExchangesByIPO(@PathVariable Long id)
	{
		return new ResponseEntity<List<String>>(ipoService.findStockExchangesByIPO(id), HttpStatus.OK);
	}
	
	@PostMapping(path = "/{id}/stock_exchanges")
	public ResponseEntity<IPODetail> addStockExchanges(@PathVariable Long id,@RequestBody Map<String, List<String>> details)
	{
		return new ResponseEntity<IPODetail>(ipoService.addStockExchanges(id, details), HttpStatus.OK);
	}
}
