package com.divit.stockExchangeApp.services;

import java.util.Map;

import com.divit.stockExchangeApp.entities.Company;
import com.divit.stockExchangeApp.entities.StockExchange;

public interface CompanyStockExchangeMapService {

	void mapCompanyStockExchange(Map<String, String> details);


	Company findCompanyByCompanyCodeAndStockExchangeId(String companyCode, Long stockExchangeId);


	Company findCompanyByCompanyCodeAndStockExchange(String companyCode, StockExchange stockExchange);


	Company findCompanyByCompanyCode(String companyCode);

}
