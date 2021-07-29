package com.divit.stockExchangeApp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class StockExchange {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	private String brief;
	
	private String contactAddress;
	
	private String remarks;
	
	@OneToMany(targetEntity = Companystockexchangemap.class, mappedBy = "stockExchange")
	
	@JsonIgnore
	private List<Companystockexchangemap> compstockmap;
	
	
	//Constructors
	
	protected StockExchange()
	{
		
	}
	
	public StockExchange(String name, String brief, String contactAddress, String remarks) {
		super();
		this.name = name;
		this.brief = brief;
		this.contactAddress = contactAddress;
		this.remarks = remarks;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getContactAddress() {
		return contactAddress;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public List<Companystockexchangemap> getCompstockmap() {
		return compstockmap;
	}

	public void setCompstockmap(List<Companystockexchangemap> compstockmap) {
		this.compstockmap = compstockmap;
	}

	public long getId() {
		return id;
	}

	public void addCompstockmap(Companystockexchangemap companystockexchangemap) {
		this.compstockmap.add(companystockexchangemap);
		
	}
	
	
	

	

}
