package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Customer;
import com.example.demo.entities.CustomerRegistration;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.services.CustomerService;
import com.example.demo.services.RoleService;
import com.example.demo.services.UserService;

@RestController
public class CustomerController {
	
	@Autowired
	CustomerService cservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	RoleService rservice;
	
	@PostMapping("/regCustomer")
	public Customer regCustomer(@RequestBody CustomerRegistration cr) {
		Role r=rservice.getRole(2);
		User u=new User(cr.getUsername(),cr.getPassword(),r,true);
		User saved=uservice.save(u);
	
		
		Customer c=new Customer(cr.getFname(),cr.getLname(),cr.getAddress(),cr.getEmail(),cr.getContact(),saved);
		return cservice.saveCustomer(c);
	}
}
