package com.divit.nonJWT.services.impls;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Sector;
import com.divit.nonJWT.exceptions.ResourceAlreadyExistsException;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.repositories.SectorRepository;
import com.divit.nonJWT.services.SectorService;

@Service
public class SectorServiceImpl implements SectorService{

	@Autowired
	private SectorRepository sectorRepository;
	
	@Override
	public List<Sector> findAll() {
		List<Sector> sectors = sectorRepository.findAll();
		return sectors;
	}

	@Override
	public Sector findById(Long id) {
		return  sectorRepository.findById(id).map(sector -> sector )
				.orElseThrow(()->new ResourceNotFoundException("Sector", id));
	}

	@Override
	public Sector findByName(String name) {
		return  sectorRepository.findByName(name).map(sector -> sector )
				.orElseThrow(()->new ResourceNotFoundException("Sector", name));
	}

	@Override
	public Sector addSector(Sector sector) {
		if(sectorRepository.existsByName(sector.getName()))
		{
			throw new ResourceAlreadyExistsException("Sector", sector.getName());
		}
		
		return sectorRepository.save(sector);
	}

	@Override
	public Sector updateSector(Long id, Sector sector) {
		if(!sectorRepository.existsById(id))
		{
			throw new ResourceNotFoundException("Sector", id);
		}
		return sectorRepository.save(sector);
	}

	@Override
	public List<Company> findCompaniesBySectorId(Long id) {
		Sector sector = findById(id);
		return sector.getCompanies();
	}
	
	
}
