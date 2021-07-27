package com.divit.nonJWT.services.impls;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Sector;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.entities.StockPrice;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.repositories.StockPriceRepository;
import com.divit.nonJWT.services.CompanyService;
import com.divit.nonJWT.services.CompanyStockExchangeMapService;
import com.divit.nonJWT.services.SectorService;
import com.divit.nonJWT.services.StockExchangeService;
import com.divit.nonJWT.services.StockPriceService;



@Service
public class StockPriceServiceImpl implements StockPriceService{
	
	@Autowired
	private StockPriceRepository stockPriceRepository;
	
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private SectorService sectorService;
	
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@Autowired
	private CompanyStockExchangeMapService companyStockExchangeMapService;
	
	
	@Override
	public List<StockPrice> findAll() {
		return stockPriceRepository.findAll();
		
	}

	
	@Override
	public StockPrice findById(Long id) {
		return  stockPriceRepository.findById(id).map(stockPrice -> stockPrice )
				.orElseThrow(()->new ResourceNotFoundException("Stock Price", id));
	}
	
	@Override
	public List<StockPrice> findCompanyStockPrices(Long id) {
		Company company = companyService.findById(id);
		return stockPriceRepository.findByCompanyId(id);
	}
	
	


	@Override
	public void addStockPrices(Map<String, Vector<Vector<String>>> stockPriceDataList) {
		
		Vector<Vector<String>> stockPriceList = stockPriceDataList.get("stockPriceList");
		if(stockPriceList != null)
		{
			
			int i = 0;
			for(Vector<String> det: stockPriceList)
			{
				if(i==0)
				{
					i =1;
					continue;
				}
				if(det.size() == 5)
				{

					String companyCode = det.get(0).trim();

					StockPrice stockPrice = new StockPrice(
							companyCode,
							det.get(1).trim(),
							Date.valueOf(det.get(3).trim()),
							Time.valueOf(det.get(4).trim()),
							Double.parseDouble(det.get(2).trim())
							);
					StockExchange stockExchange = stockExchangeService.findByName(stockPrice.getExchangeName());

					Company company = companyStockExchangeMapService.findCompanyByCompanyCodeAndStockExchangeId(stockPrice.getCompanyCode(), stockExchange.getId());

					stockPrice.setCompany(company);
					
					stockPriceRepository.save(stockPrice);
				}
				
			}
					
		}
	}
		


	@Override
	public StockPrice updateStockPrice(Long id, StockPrice stockPrice) {
		if(!stockPriceRepository.existsById(id))
		{
			throw new ResourceNotFoundException("Stock Price", id);
		}
		return stockPriceRepository.save(stockPrice);
	}


	@Override
	public List<StockPrice> getStockPriceForCompanyChart(Map<String, String> req_details) {
		
		Date fromDate = Date.valueOf(req_details.get("fromDateTime").split("T")[0]);
		Date toDate = Date.valueOf(req_details.get("toDateTime").split("T")[0]);
//		Time fromTime = Time.valueOf(req_details.get("fromDate").split("T")[1].split(".")[0]);
//		Time toTime = Time.valueOf(req_details.get("toDate").split("T")[1].split(".")[0]);
		Company company = companyService.findByName(req_details.get("companyName"));
		
		List<StockPrice> stockPrices = stockPriceRepository.findByCompanyIdAndExchangeName(company.getId(), req_details.get("stockExchangeName"));
		List<StockPrice> res_stockPrices = new ArrayList<StockPrice>();
		if(stockPrices != null)
		{
			stockPrices.stream().filter(stockPrice -> 
			{
				Date date  = stockPrice.getDate();
				return date.after(fromDate) && date.before(toDate);
			}).forEach(stockPrice -> res_stockPrices.add(stockPrice));
		}
		return res_stockPrices;
				
	}
	
	@Override
	public List<StockPrice> getStockPriceForSectorChart(Map<String, String> req_details) {
		
		Date fromDate = Date.valueOf(req_details.get("fromDateTime").split("T")[0]);
		Date toDate = Date.valueOf(req_details.get("toDateTime").split("T")[0]);
//		Time fromTime = Time.valueOf(req_details.get("fromDate").split("T")[1].split(".")[0]);
//		Time toTime = Time.valueOf(req_details.get("toDate").split("T")[1].split(".")[0]);
		Sector sector = sectorService.findByName(req_details.get("sectorName"));
		List<StockPrice> res_stockPrices = new ArrayList<StockPrice>();
		List<Company> companyList = sectorService.findCompaniesBySectorId(sector.getId());
		if(companyList!=null)
		{
			companyList.stream().forEach(company ->
			{
				List<StockPrice> stockPrices = stockPriceRepository.findByCompanyIdAndExchangeName(company.getId(), req_details.get("stockExchangeName"));
				
				if(stockPrices != null)
				{
					stockPrices.stream().filter(stockPrice -> 
					{
						Date date  = stockPrice.getDate();
						return date.after(fromDate) && date.before(toDate);
					}).forEach(stockPrice -> res_stockPrices.add(stockPrice));
				}

			});
					}
		
		return res_stockPrices;
				
	}
}
