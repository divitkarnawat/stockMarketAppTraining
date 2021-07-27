package com.divit.nonJWT.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.nonJWT.entities.StockExchange;

@Repository
public interface StockExchangeRepository extends JpaRepository<StockExchange, Long> {

	Optional<StockExchange> findByName(String name);

	boolean existsByName(String name);

}
