package com.divit.nonJWT.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Sector {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;


	@Column(nullable = false)
	private String name;


	@Column(nullable = false)
	private String brief;


	@OneToMany(mappedBy = "sector")
	@JsonIgnore
	private List<Company> companies = new ArrayList<>();


	protected Sector() {
	}


	public Sector(String name, String brief) {
		super();
		this.name = name;
		this.brief = brief;
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


	public List<Company> getCompanies() {
		return companies;
	}


	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}


	public Long getId() {
		return id;
	}


	public void addCompany(Company company) {
		this.companies.add(company);
	}
	
	public void removeCompany(Company company)
	{
		this.companies.remove(company);
	}
	
	

}
