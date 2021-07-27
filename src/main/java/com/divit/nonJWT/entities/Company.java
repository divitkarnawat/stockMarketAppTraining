package com.divit.nonJWT.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sun.istack.NotNull;


@Entity
@Table(name = "Company")
public class Company {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Double turnover;
	
	@Column(nullable = false)
	private String ceo;
	
	@Column(nullable = false)
	@Type(type = "text")
	private String boardOfDirectors;

	@Column(nullable = false)
	@Type(type = "text")
	private String brief;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private Sector sector;
	
	@Column(nullable = false)
	private String sectorName;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "company", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private IPODetail ipo;
	
	@OneToMany(targetEntity = Companystockexchangemap.class, mappedBy = "company")
	@JsonIgnore
	private List<Companystockexchangemap> compstockmap;
	
	protected Company()
	{
		
	}

	public Company(String name, Double turnover, String ceo, String boardOfDirectors, String brief) {
		super();
		this.name = name;
		this.turnover = turnover;
		this.ceo = ceo;
		this.boardOfDirectors = boardOfDirectors;
		this.brief = brief;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getTurnover() {
		return turnover;
	}

	public void setTurnover(Double turnover) {
		this.turnover = turnover;
	}

	public String getCeo() {
		return ceo;
	}

	public void setCeo(String ceo) {
		this.ceo = ceo;
	}

	public String getBoardOfDirectors() {
		return boardOfDirectors;
	}

	public void setBoardOfDirectors(String boardOfDirectors) {
		this.boardOfDirectors = boardOfDirectors;
	}


	public Sector getSector() {
		return sector;
	}

	public void setSector(Sector sector) {
		this.sector = sector;
	}

	public IPODetail getIpo() {
		return ipo;
	}

	public void setIpo(IPODetail ipo) {
		this.ipo = ipo;
	}

	public List<Companystockexchangemap> getCompstockmap() {
		return compstockmap;
	}

	public void setCompstockmap(List<Companystockexchangemap> compstockmap) {
		this.compstockmap = compstockmap;
	}

	public Long getId() {
		return id;
	}

	public void addCompstockmap(Companystockexchangemap companystockexchangemap) {
		this.compstockmap.add(companystockexchangemap);
		
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getSectorName() {
		return sectorName;
	}

	public void setSectorName(String sectorName) {
		this.sectorName = sectorName;
	}

	
	
	




}
