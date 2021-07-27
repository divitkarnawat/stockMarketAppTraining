package com.divit.nonJWT.services.impls;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.IPODetail;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.repositories.IPORepository;
import com.divit.nonJWT.services.IPOService;
import com.divit.nonJWT.services.StockExchangeService;

@Service
public class IPOServiceImpl implements IPOService {

	
	@Autowired
	private IPORepository ipoRepository;
	
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@Override
	public IPODetail findById(Long id) {
		return  ipoRepository.findById(id).map(ipo -> ipo )
				.orElseThrow(()->new ResourceNotFoundException("IPO", id));
	}
	
	@Override
	public List<String> findStockExchangesByIPO(Long id) {
		IPODetail ipoDetail = findById(id);
		List<String> stockExchangeNames = new ArrayList<String>();
		
	
		List<StockExchange> stockExchanges = ipoDetail.getStockExchanges();
		if(stockExchanges != null)
			{
			stockExchanges.stream()
					.map(stockExchange-> stockExchange.getName())
					.forEach(name-> stockExchangeNames.add(name));
			}
		return stockExchangeNames;
	}

	@Override
	public IPODetail addStockExchanges(Long id, Map<String, List<String>> details) {
		IPODetail ipoDetail = findById(id);
		List<String> det = details.get("stockExchangeList");
		det.stream().map(se_name -> stockExchangeService.findByName(se_name)).forEach(stockExchange -> ipoDetail.addStockExchanges(stockExchange));
		ipoDetail.setValid(true);
		ipoRepository.save(ipoDetail);
		return ipoDetail;
	}

	@Override
	public IPODetail update(Long id, IPODetail ipoDetail) {
		return ipoRepository.save(ipoDetail);
	}

	@Override
	public List<IPODetail> findIPOs() {
		return ipoRepository.findAllByValidAndOpenDateTimeGreaterThanEqualOrderByOpenDateTimeAsc(true, LocalDateTime.now());
	}

	


}
