package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;
import com.example.demo.entities.User;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
	@Query("SELECT c FROM Customer c WHERE c.user_id = :uid")
    Customer findCustomer(User uid);
	
	
}
