package com.divit.stockExchangeApp.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class IPODetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private Double pricePerShare;

	@Column(nullable = false)
	private Double totalNumberOfShares;
	
	@Column(nullable = false)
	private LocalDateTime openDateTime;

	private String remarks;
	
	@JsonIgnore
	private boolean valid;
	
	@OneToOne(fetch = FetchType.LAZY)
	private Company company;

	
	@JsonIgnore
	@ManyToMany
	private List<StockExchange> stockExchanges = new ArrayList<>();

	protected IPODetail() {
	}
	
	public IPODetail(double pricePerShare, double totalNumberOfShares, LocalDateTime openDateTime, String remarks) {
		super();
		this.pricePerShare = pricePerShare;
		this.totalNumberOfShares = totalNumberOfShares;
		this.openDateTime = openDateTime;
		this.remarks = remarks;
		}

	public Double getPricePerShare() {
		return pricePerShare;
	}

	public void setPricePerShare(Double pricePerShare) {
		this.pricePerShare = pricePerShare;
	}

	public Double getTotalNumberOfShares() {
		return totalNumberOfShares;
	}

	public void setTotalNumberOfShares(Double totalNumberOfShares) {
		this.totalNumberOfShares = totalNumberOfShares;
	}

	public LocalDateTime getOpenDateTime() {
		return openDateTime;
	}

	public void setOpenDateTime(LocalDateTime openDateTime) {
		this.openDateTime = openDateTime;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	
	public List<StockExchange> getStockExchanges() {
		return stockExchanges;
	}

	public void addStockExchanges(StockExchange stockExchange) {
		this.stockExchanges.add(stockExchange);
	}

	public Long getId() {
		return id;
	}

	public void setValid(boolean b) {
		this.valid = b;
	}

	public boolean getValid() {
		return valid;
	}
	
	
	
}
