package com.divit.nonJWT.services.impls;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divit.nonJWT.entities.Company;
import com.divit.nonJWT.entities.Companystockexchangemap;
import com.divit.nonJWT.entities.IPODetail;
import com.divit.nonJWT.entities.Sector;
import com.divit.nonJWT.entities.StockExchange;
import com.divit.nonJWT.exceptions.ResourceAlreadyExistsException;
import com.divit.nonJWT.exceptions.ResourceNotFoundException;
import com.divit.nonJWT.repositories.CompanyRepository;
import com.divit.nonJWT.repositories.IPORepository;
import com.divit.nonJWT.repositories.SectorRepository;
import com.divit.nonJWT.services.CompanyService;
import com.divit.nonJWT.services.SectorService;

@Service
public class CompanyServiceImpl implements CompanyService{

	@Autowired 
	private CompanyRepository companyRepository;
	
	@Autowired
	private SectorRepository sectorRepository;
		
	@Autowired
	private SectorService sectorService;
	
	@Autowired
	private IPORepository ipoRepository;
	
	
	@Override
	public List<Company> findAll() {
		return companyRepository.findAll();
		
	}

	@Override
	public Company findById(Long id) {
		return  companyRepository.findById(id).map(company -> company )
				.orElseThrow(()->new ResourceNotFoundException("Company", id));
	}
	
	@Override
	public Company findByName(String name) {
		return  companyRepository.findByName(name).map(company -> company )
				.orElseThrow(()->new ResourceNotFoundException("Company", name));
	}
	
	@Override
	public List<Company> findByNamePattern(String pattern) {
		return companyRepository.findByNameIgnoreCaseContaining(pattern);
	}
	
	@Override
	public Company addCompany(Company company){
		if(companyRepository.existsByName(company.getName()))
		{
			throw new ResourceAlreadyExistsException("Company", company.getName());
		}
		Sector sector = sectorService.findByName(company.getSectorName());
		company.setSector(sector);
		sector.addCompany(company);
		sectorRepository.save(sector);
		return companyRepository.save(company);
	}
	
	
	@Override
	public Company updateCompany(Long id, Company companyUpdate)
	{
		Company company = findById(id);
		
		Sector sector = sectorService.findByName(company.getSectorName());
		sector.removeCompany(company);
		
		sectorRepository.save(sector);
		
		Sector sectorUpdate = sectorService.findByName(companyUpdate.getSectorName());
		
		companyUpdate.setSector(sectorUpdate);
		sectorUpdate.addCompany(companyUpdate);
		
		sectorRepository.save(sectorUpdate);
		
		return companyRepository.save(companyUpdate);
	}

	@Override
	public IPODetail findCompanyIPODetail(Long id) {
		Company company = findById(id);
		return company.getIpo();
	}

	@Override
	public List<StockExchange> findCompanyStockExchanges(Long id) {
		Company company = findById(id);
		
		List<Companystockexchangemap> compstockmap = company.getCompstockmap();
		List<StockExchange> companyStockExchanges = new ArrayList<StockExchange> ();
		if(compstockmap != null)
		{
			compstockmap.stream()
				.forEach(csem-> companyStockExchanges.add(csem.getStockExchange()));
		}
		
		return companyStockExchanges;
	}

	@Override
	public IPODetail addIPO(Long id, IPODetail ipoDetail) {
		Company company = findById(id);
		if(company.getIpo() != null)
		{
			throw new ResourceAlreadyExistsException("IPO already exists");
		}
		ipoDetail.setValid(false);
		ipoDetail.setCompany(company);
		ipoRepository.save(ipoDetail);
		company.setIpo(ipoDetail);
		companyRepository.save(company);
		return ipoDetail;
	}

	@Override
	public List<Long> isIPOAdded(Long id) {
		Company company = findById(id);
		List<Long> isIPO = new ArrayList<Long>();
		if(company.getIpo() != null)
		{
			isIPO.add(1L);
			isIPO.add(company.getIpo().getId());
		}
		else
		{
			isIPO.add(0L);
			isIPO.add(null);
		}
		
		
		return isIPO;
		
	}

//	
//	
//	public List<String> findCompanyStockExchanges(Long id) {
//		Company company = findById(id);
//		
//		List<Companystockexchangemap> compstockmap = company.getCompstockmap();
//		List<String> companyStockExchanges = new ArrayList<String> ();
//		if(compstockmap != null)
//		{
//			compstockmap.stream()
//				.map(csem-> csem.getStockExchange().getName())
//				.forEach(name-> companyStockExchanges.add(name));
//		}
//		
//		return companyStockExchanges;
//	}


	
	
	
	
	
	
	
	
	
	

}
