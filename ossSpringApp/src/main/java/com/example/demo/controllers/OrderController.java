package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.entities.Services;
import com.example.demo.entities.Vendor;

import com.example.demo.request.OrderDTO;
import com.example.demo.services.CustomerService;
import com.example.demo.services.OrderService;
import com.example.demo.services.ServicesService;
import com.example.demo.services.VendorService;

@RestController
public class OrderController {

	@Autowired
	OrderService oservice;
	
	@Autowired
	VendorService vservice;
	
	@Autowired
	CustomerService cservice;
	
	@Autowired
	ServicesService sservice;
	
	 @PostMapping("/saveOrder")
	    public Order saveOrder(@RequestBody OrderDTO order) {
	    	
	    	 Vendor vendor = vservice.findById(order.getVendorId());
	         
	         Customer customer = cservice.findById(order.getCustomerId());
	         
	         Services services = sservice.findById(order.getServicesId());
	         
	    	Order o=new Order(customer,vendor,services,order.getBookingDatetime(),order.getStatus());
	      return  oservice.saveOrder(o);  
	    }
}
