package com.divit.stockExchangeApp.services;

import java.util.List;
import java.util.Optional;

import com.divit.stockExchangeApp.entities.Company;
import com.divit.stockExchangeApp.entities.Sector;

public interface SectorService {
	
	public List<Sector> findAll();
	public Sector findById(Long id);
	public Sector addSector(Sector sector);
	public Sector updateSector(Long id,Sector sector);
	public List<Company> findCompaniesBySectorId(Long id);
	Sector findByName(String name);
}
