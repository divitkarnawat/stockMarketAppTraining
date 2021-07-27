package com.divit.nonJWT.services;

import java.util.List;
import java.util.Optional;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Sector;

public interface SectorService {
	
	public List<Sector> findAll();
	public Sector findById(Long id);
	public Sector addSector(Sector sector);
	public Sector updateSector(Long id,Sector sector);
	public List<Company> findCompaniesBySectorId(Long id);
	Sector findByName(String name);
}
