package com.example.demo.services;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.User;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	CustomerRepository crepo;
	
	public Customer saveCustomer(Customer c) {
		return crepo.save(c);
	}
	
	
	 public Customer findCustomer(User user) {
	       return crepo.findCustomer(user);
	  }
	 
	 public Customer findById(int id) {
	        Optional<Customer> customer = crepo.findById(id);
	        return customer.orElse(null);
	    }
}
