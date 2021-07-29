package com.divit.stockExchangeApp.services;

import java.util.List;
import java.util.Map;

import com.divit.stockExchangeApp.entities.IPODetail;

public interface IPOService {

	List<String> findStockExchangesByIPO(Long id);

	IPODetail addStockExchanges(Long id, Map<String, List<String>> details);

	IPODetail findById(Long id);

	IPODetail update(Long id, IPODetail ipoDetail);

	List<IPODetail> findIPOs();
	

}
