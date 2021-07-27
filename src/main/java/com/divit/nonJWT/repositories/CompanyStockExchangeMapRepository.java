package com.divit.nonJWT.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Companystockexchangemap;
import com.divit.nonJWT.entities.StockExchange;

@Repository
public interface CompanyStockExchangeMapRepository extends JpaRepository<Companystockexchangemap, Long>{

	
//	Optional<Companystockexchangemap> findByCompanyCodeAndStockExchangeId(String companyCode, Long stockExchangeId);
	

	boolean existsByCompanyCode(String string);

	boolean existsByCompanyIdAndStockExchangeId(Long id, long id2);
	
	
	Companystockexchangemap findByCompanyCodeAndStockExchange(String companyCode, StockExchange stockExchange);


	Companystockexchangemap findByCompanyCode(String string);


	Companystockexchangemap findByCompanyCodeAndStockExchangeId(String companyCode, Long i);

	
	
	

}
