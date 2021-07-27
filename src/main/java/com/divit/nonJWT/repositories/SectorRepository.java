package com.divit.nonJWT.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.nonJWT.entities.Sector;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {
	
	public Sector save(Sector sector);

	public Optional<Sector> findByName(String sectorName);

	public boolean existsByName(String name);

	
}
