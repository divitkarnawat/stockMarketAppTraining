package com.divit.stockExchangeApp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.stockExchangeApp.entities.StockPrice;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice, Long> {

	List<StockPrice> findByCompanyId(Long id);


	List<StockPrice> findByCompanyIdAndExchangeName(Long id, String string);

}
 