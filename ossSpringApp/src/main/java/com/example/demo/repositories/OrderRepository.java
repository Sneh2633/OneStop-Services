package com.example.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.entities.Vendor;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer>{

	@Query("SELECT o.customer_id FROM Order o WHERE o.vendor_id.id = :vendorId")
	List<Customer> findCustomerDetailsByVendorId(@Param("vendorId") int vendorId);

	@Query("SELECT o FROM Order o WHERE o.customer_id=:c")
	List<Order> findByCustomer_id(Customer c);

	@Query("SELECT o FROM Order o WHERE o.vendor_id = :v")
	List<Order> findAllBYVendorId(Vendor v);
	
}
