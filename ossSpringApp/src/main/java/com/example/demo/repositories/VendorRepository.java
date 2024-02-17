package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;
import com.example.demo.entities.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {

	
	@Query("SELECT v FROM Vendor v WHERE v.user_id in (SELECT u FROM User u WHERE u.status = false)")
	public List<Vendor> getVendors();

	
	//to show services by fetching service id
	 @Query("SELECT v FROM Vendor v WHERE v.serviceid.id = :serviceId")
	    List<Vendor> findByServiceId(@Param("serviceId") int serviceId);
	 
	 @Query("SELECT v FROM Vendor v WHERE v.user_id = :uid")
	    Vendor findVendor(User uid);


}
