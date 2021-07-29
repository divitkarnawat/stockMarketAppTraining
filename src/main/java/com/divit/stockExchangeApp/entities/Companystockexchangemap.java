package com.divit.stockExchangeApp.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class Companystockexchangemap {
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable=false)
	private String companyCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Company company;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private StockExchange stockExchange;

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public StockExchange getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(StockExchange stockExchange) {
		this.stockExchange = stockExchange;
	}

	public long getId() {
		return id;
	}
	
	

}
