package com.divit.stockExchangeApp.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.stockExchangeApp.entities.IPODetail;

@Repository
public interface IPORepository extends JpaRepository<IPODetail, Long> {

//	List<IPODetail> findAllByOrderByOpenDateTimeAsc();

	List<IPODetail> findAllByValidOrderByOpenDateTimeAsc(boolean b);

	List<IPODetail> findAllByValidAndOpenDateTimeGreaterThanEqualOrderByOpenDateTimeAsc(boolean b, LocalDateTime now);

}