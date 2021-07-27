package com.divit.nonJWT.services;

import java.util.Map;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.StockExchange;

public interface CompanyStockExchangeMapService {

	void mapCompanyStockExchange(Map<String, String> details);


	Company findCompanyByCompanyCodeAndStockExchangeId(String companyCode, Long stockExchangeId);


	Company findCompanyByCompanyCodeAndStockExchange(String companyCode, StockExchange stockExchange);


	Company findCompanyByCompanyCode(String companyCode);

}
