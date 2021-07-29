package com.divit.stockExchangeApp.dtos;

import java.util.List;

public class CompanyDto {

	private Long id;
	private String name;
	private Double turnover;
	private String ceo;
	private String boardOfDirectors;
	private String brief;
	private Long sectorId;
	private List<StockExMapDetailDto> stockExMapDetails; 
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getBrief() {
		return brief;
	}
	public void setBrief(String brief) {
		this.brief = brief;
	}
	public Long getSectorId() {
		return sectorId;
	}
	public void setSectorId(Long sectorId) {
		this.sectorId = sectorId;
	}
	public List<StockExMapDetailDto> getStockExMapDetails() {
		return stockExMapDetails;
	}
	public void setStockExMapDetails(List<StockExMapDetailDto> stockExMapDetails) {
		this.stockExMapDetails = stockExMapDetails;
	}
	
	
	
	
}
