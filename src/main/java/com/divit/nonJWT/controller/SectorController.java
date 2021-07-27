package com.divit.nonJWT.controller;

import java.util.List;
import java.util.Optional;

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
import com.divit.nonJWT.entities.Sector;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.exceptions.SectorNotFoundException;
import com.divit.nonJWT.services.SectorService;

@RestController
@RequestMapping("/sectors")
@CrossOrigin(origins ="http://localhost:3000")
public class SectorController {
	
	@Autowired
	private SectorService sectorService;
	
	// find all sectors
	@GetMapping(path = "")
	public ResponseEntity<List<Sector>> findAll()
	{
		List<Sector> sectors= sectorService.findAll();
		return new ResponseEntity<List<Sector>>(sectors, HttpStatus.OK);
	}
	
	// find sector by id
	@GetMapping(path = "/id/{sectorId}")
	public ResponseEntity<Sector> findById(@PathVariable("sectorId") Long id)
	{
		return new ResponseEntity<Sector>(sectorService.findById(id), HttpStatus.OK);
	}
	
	// add a sector
	@PostMapping(path = "")
	public ResponseEntity<Sector> addSector(@RequestBody Sector sector)
	{
		return new ResponseEntity<Sector>(sectorService.addSector(sector), HttpStatus.CREATED);
	}
	
	// update a sector
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<Sector> updateSector(@PathVariable Long id, @RequestBody Sector sector)
	{
		return new ResponseEntity<Sector>(sectorService.updateSector(id, sector), HttpStatus.OK);
	}
	
	// get companies in a sector
	@GetMapping(path = "/{id}/companies")
	public ResponseEntity<List<Company>> findCompaniesBySectorId(@PathVariable Long id)
	{
		List<Company> companies = sectorService.findCompaniesBySectorId(id);
		return new ResponseEntity<List<Company>>(companies, HttpStatus.OK);
	}
	
	
}
