package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ServiceCost;
import com.example.demo.entities.Vendor;

@Repository
public interface ServiceCostRepository extends JpaRepository<ServiceCost, Integer> {

	@Query("SELECT s FROM ServiceCost s WHERE s.vendor_id=:v")
	List<ServiceCost> findAllByVendor_id(Vendor v);

}
