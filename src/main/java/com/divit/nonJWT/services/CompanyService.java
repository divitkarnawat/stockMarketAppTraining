package com.divit.nonJWT.services;

import java.util.List;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.IPODetail;
import com.divit.nonJWT.entities.StockExchange;

public interface CompanyService {

	List<Company> findAll();

	Company findById(Long id);
	
	Company findByName(String name);

	Company addCompany(Company company);

	List<Company> findByNamePattern(String pattern);

	Company updateCompany(Long id, Company companyUpdate);

	IPODetail findCompanyIPODetail(Long id);

	List<StockExchange> findCompanyStockExchanges(Long id);

	IPODetail addIPO(Long id, IPODetail ipoDetail);
	
	List<Long> isIPOAdded(Long id);

	

	

}
