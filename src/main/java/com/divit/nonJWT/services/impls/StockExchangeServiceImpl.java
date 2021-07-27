package com.divit.nonJWT.services.impls;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.exceptions.ResourceAlreadyExistsException;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.repositories.StockExchangeRepository;
import com.divit.nonJWT.services.StockExchangeService;

@Service
public class StockExchangeServiceImpl implements StockExchangeService {

	@Autowired
	private StockExchangeRepository stockExchangeRepository;
	
	@Override
	public List<StockExchange> findAll() {
		return stockExchangeRepository.findAll();
	}

	@Override
	public StockExchange findById(Long id) {
		return  stockExchangeRepository.findById(id).map(stockExchange -> stockExchange )
				.orElseThrow(()->new ResourceNotFoundException("Stock Exchange", id));
	}
	
	@Override
	public StockExchange findByName(String name) {
		return  stockExchangeRepository.findByName(name).map(stockExchange -> stockExchange )
				.orElseThrow(()->new ResourceNotFoundException("Stock Exchange", name));
	}

	@Override
	public StockExchange addStockExchange(StockExchange stockExchange) {
		if(stockExchangeRepository.existsByName(stockExchange.getName()))
		{
			throw new ResourceAlreadyExistsException("Stock Exchange", stockExchange.getName());
		}
		return stockExchangeRepository.save(stockExchange);
	}
	
	
	@Override
	public StockExchange updateStockExchange(Long id, StockExchange stockExchange)
	{
		return stockExchangeRepository.save(stockExchange);
	}

	@Override
	public List<Company> findCompaniesByStockExchangeId(Long id) {
		
		StockExchange stockExchange = findById(id);
		
		return Optional.ofNullable(stockExchange.getCompstockmap()).map(
												list->list.stream()
												.map(csem->csem.getCompany())
												.toList())
									.orElseGet(null);
				
	}

	
}
