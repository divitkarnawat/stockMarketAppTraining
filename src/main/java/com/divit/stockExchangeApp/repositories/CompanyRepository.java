package com.divit.stockExchangeApp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.stockExchangeApp.entities.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

	Optional<Company> findByName(String name);

	List<Company> findByNameIgnoreCaseContaining(String pattern);

	boolean existsByName(String name);

}
