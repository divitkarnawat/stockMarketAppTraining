package com.divit.stockExchangeApp.services;

import java.util.List;
import java.util.Optional;

import com.divit.stockExchangeApp.entities.Company;
import com.divit.stockExchangeApp.entities.StockExchange;

public interface StockExchangeService {

	List<StockExchange> findAll();
	StockExchange findById(Long id);
	StockExchange findByName(String name);
	StockExchange addStockExchange(StockExchange stockExchange);
	StockExchange updateStockExchange(Long id, StockExchange stockExchange);
	List<Company> findCompaniesByStockExchangeId(Long id);

}
