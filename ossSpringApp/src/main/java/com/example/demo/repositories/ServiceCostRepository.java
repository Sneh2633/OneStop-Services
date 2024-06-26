package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ServiceCost;
import com.example.demo.entities.Services;
import com.example.demo.entities.Vendor;

@Repository
public interface ServiceCostRepository extends JpaRepository<ServiceCost, Integer> {


	@Query("SELECT s from ServiceCost s WHERE s.service_id=:subServiceId")
	List<ServiceCost> findAllByService_id(Services subServiceId);

	@Query("SELECT s FROM ServiceCost s WHERE s.vendor_id=:v")
	List<ServiceCost> findAllByVendor_id(Vendor v);

	@Query("SELECT sc.cost, s.name, s.description FROM ServiceCost sc JOIN sc.service_id s WHERE s.service_id = :serviceId")
	List<Object[]> findServiceDetailsByServiceId(@Param("serviceId") int serviceId);
	
}
