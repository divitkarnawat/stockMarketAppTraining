package com.divit.nonJWT.entities;


import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class StockPrice {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable = false)
	private String companyCode;
	
	@Column(nullable = false)
	private String exchangeName;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Company company;
	
	@Column(nullable = false)
	private Date date;
	
	@Column(nullable = false)
	private Time time;
	
	@Column(nullable = false)
	private double sharePrice;
	
	public StockPrice()
	{
		
	}

	public StockPrice(String companyCode, String exchangeName, Date date, Time time, double sharePrice) {
		super();
		this.companyCode = companyCode;
		this.exchangeName = exchangeName;
		this.date = date;
		this.time = time;
		this.sharePrice = sharePrice;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getExchangeName() {
		return exchangeName;
	}

	public void setExchangeName(String exchangeName) {
		this.exchangeName = exchangeName;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public double getCurrentPrice() {
		return sharePrice;
	}

	public void setCurrentPrice(double sharePrice) {
		this.sharePrice = sharePrice;
	}

	public long getId() {
		return id;
	}
	
	
	


}
