package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	OrderRepository orepo;
	
	public Order saveOrder(Order order)
	{
		return orepo.save(order);
	}
	
	public List<Customer> getCustomerDetailsForVendor(int vendorId) {
        return orepo.findCustomerDetailsByVendorId(vendorId);
    }
}
