package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Services;

@Repository
public interface ServicesRepository extends JpaRepository<Services, Integer> {

	@Query("SELECT s FROM Services s WHERE s.category_id=:sid")
	public List<Services> findByCatId(@Param ("sid")int sid);

	@Query("select s from Services s Where s.category_id.service_id=:categoryId")
	List<Services> findByCategoryId(int categoryId);
	
}
