package com.divit.nonJWT.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.divit.nonJWT.entities.StockPrice;

public interface StockPriceService {

	List<StockPrice> findCompanyStockPrices(Long id);

	List<StockPrice> findAll();

	StockPrice findById(Long id);

	void addStockPrices(Map<String, Vector<Vector<String>>> stockPriceDataList);

	StockPrice updateStockPrice(Long id,StockPrice stockPrice);

	List<StockPrice> getStockPriceForCompanyChart(Map<String, String> req_details);

	List<StockPrice> getStockPriceForSectorChart(Map<String, String> req_details);

}
