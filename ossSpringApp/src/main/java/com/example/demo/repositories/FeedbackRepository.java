package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<feedback, Integer> {

		@Query("SELECT f FROM feedback f WHERE f.vendor_id.id = :vendorId")
	    List<feedback> findByVendorId(@Param("vendorId") int vendorId);
}
