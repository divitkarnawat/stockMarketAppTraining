package com.divit.nonJWT.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.divit.nonJWT.entities.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long>{

	Optional<AppUser> findByUsername(String name);

	boolean existsByUsername(String username);

}
