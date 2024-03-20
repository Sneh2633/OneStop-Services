package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.VendorRepository;

@Service
public class OrderService {

	@Autowired
	OrderRepository orepo;

	@Autowired
	private CustomerRepository crepo;
	
	@Autowired
	private VendorRepository vrepo;

	public Order saveOrder(Order order) {
		return orepo.save(order);
	}

	public List<Customer> getCustomerDetailsForVendor(int vendorId) {
		return orepo.findCustomerDetailsByVendorId(vendorId);
	}

	public Order approveOrder(int orderId) throws Exception {
		Order o = orepo.findById(orderId).orElseThrow();
		if (o.getStatus() == 0) {
			o.setStatus(1);
		} else if (o.getStatus() == -1) {
			throw new Exception("Order Rejected By Vendor!!!");
		}

		return orepo.save(o);
	}

	public Order completeOrder(int orderId) {
		Order o = orepo.findById(orderId).orElseThrow();
		if (o.getStatus() == 1) {
			o.setStatus(2);
		}

		return orepo.save(o);
	}

	public Order rejectOrder(int orderId) {
		Order o = orepo.findById(orderId).orElseThrow();
		if (o.getStatus() == 0) {
			o.setStatus(-1);
		}

		return orepo.save(o);
	}

	public List<Order> completedOrdersForCustomer(int customerId) {
		Customer c = crepo.findById(customerId).orElseThrow();
		List<Order> ordersByCustomer = orepo.findByCustomer_id(c);
		List<Order> completedOrders = new ArrayList<>();

		ordersByCustomer.forEach(order -> {
			if (order.getStatus() == 2) {
				completedOrders.add(order);
			}
		});
		return completedOrders;
	}

	public List<Order> rejectedOrdersForCustomer(int customerId) {
		Customer c = crepo.findById(customerId).orElseThrow();
		List<Order> ordersByCustomer = orepo.findByCustomer_id(c);
		List<Order> rejectedOrders = new ArrayList<>();

		ordersByCustomer.forEach(order -> {
			if ( order.getStatus()==-1) {
				rejectedOrders.add(order);
			}
		});
		return rejectedOrders;
	}

	public List<Order> getCustomersToApproveRequest(int vendorId) {
		Vendor v = vrepo.findById(vendorId).orElseThrow();
		List<Order> orders = orepo.findAllBYVendorId(v);
		
		List<Order> ordersToApprove = new ArrayList<>();
		
		orders.forEach(order ->{
			if(order.getStatus()==0) {
				ordersToApprove.add(order);
			}
		});
		return ordersToApprove;
	}

	public List<Order> pendingOrdersByVendor(int vendorId) {
		Vendor v = vrepo.findById(vendorId).orElseThrow();
		List<Order> orders = orepo.findAllBYVendorId(v);
		
		List<Order> pendingOrders = new ArrayList<>();
		
		orders.forEach(order ->{
			if(order.getStatus()==1) {
				pendingOrders.add(order);
			}
		});
		return pendingOrders;
	}

	public List<Order> approvedOrdersForCustomer(int customerId) {
		Customer c = crepo.findById(customerId).orElseThrow();
		List<Order> ordersByCustomer = orepo.findByCustomer_id(c);
		List<Order> approvedOrders = new ArrayList<>();

		ordersByCustomer.forEach(order -> {
			if ( order.getStatus()==1) {
				approvedOrders.add(order);
			}
		});
		return approvedOrders;
	}

	
}
