package com.divit.nonJWT.services.impls;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Companystockexchangemap;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.exceptions.ResourceAlreadyExistsException;
import com.divit.nonJWT.repositories.CompanyStockExchangeMapRepository;
import com.divit.nonJWT.services.CompanyService;
import com.divit.nonJWT.services.CompanyStockExchangeMapService;
import com.divit.nonJWT.services.StockExchangeService;

@Service
public class CompanyStockExchangeMapServiceImpl implements CompanyStockExchangeMapService{

	@Autowired
	private CompanyStockExchangeMapRepository companyStockExchangeMapRepository;
	
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@Override
	public void mapCompanyStockExchange(Map<String, String> details) {
		
		if(companyStockExchangeMapRepository.existsByCompanyCode(details.get("companyCode")))
		{
			throw new ResourceAlreadyExistsException("Company Code", details.get("companyCode"));
		}
		
		Company company = companyService.findByName(details.get("companyName"));
		StockExchange stockExchange = stockExchangeService.findByName(details.get("stockExchangeName"));
		if(companyStockExchangeMapRepository.existsByCompanyIdAndStockExchangeId(company.getId(), stockExchange.getId()))
		{
			throw new ResourceAlreadyExistsException("Company is already mapped to Stock Exchange");
		}
		Companystockexchangemap companystockexchangemap = new Companystockexchangemap();
		companystockexchangemap.setCompanyCode(details.get("companyCode"));
		companystockexchangemap.setCompany(company);
		companystockexchangemap.setStockExchange(stockExchange);
		company.addCompstockmap(companystockexchangemap);
		stockExchange.addCompstockmap(companystockexchangemap);
		
		companyStockExchangeMapRepository.save(companystockexchangemap);
		companyService.updateCompany(company.getId(), company);
		stockExchangeService.updateStockExchange(stockExchange.getId(), stockExchange);
		
		
	}

	@Override
	public Company findCompanyByCompanyCodeAndStockExchangeId(String companyCode, Long stockExchangeId) {
		
		return companyStockExchangeMapRepository.findByCompanyCodeAndStockExchangeId(companyCode, stockExchangeId).getCompany();
	}

	@Override
	public Company findCompanyByCompanyCodeAndStockExchange(String companyCode, StockExchange stockExchange) {
		return companyStockExchangeMapRepository.findByCompanyCodeAndStockExchange(companyCode, stockExchange).getCompany();
	}

	@Override
	public Company findCompanyByCompanyCode(String companyCode) {
		// TODO Auto-generated method stub
		return null;
	}


	
}
