package com.divit.nonJWT.services;

import java.util.List;
import java.util.Optional;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.StockExchange;

public interface StockExchangeService {

	List<StockExchange> findAll();
	StockExchange findById(Long id);
	StockExchange findByName(String name);
	StockExchange addStockExchange(StockExchange stockExchange);
	StockExchange updateStockExchange(Long id, StockExchange stockExchange);
	List<Company> findCompaniesByStockExchangeId(Long id);

}
