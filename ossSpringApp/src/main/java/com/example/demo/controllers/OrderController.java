package com.example.demo.controllers;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@CrossOrigin
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
		 
		 System.out.println(order);
	    	
	    	 Vendor vendor = vservice.findById(order.getVendorId());
	         
	         Customer customer = cservice.findById(order.getCustomerId());
	         
	         Services services = sservice.findById(order.getServicesId());
	         
	    	Order o=new Order(customer,vendor,services,order.getBookingDatetime(),order.getStatus());
	      return  oservice.saveOrder(o);  
	    }
	 @GetMapping("/customer-details/vendor/{vendorId}")
	    public ResponseEntity<List<Customer>> getCustomerDetailsForVendor(@PathVariable int vendorId) {
	        List<Customer> customers = oservice.getCustomerDetailsForVendor(vendorId);
	        return ResponseEntity.ok(customers);
	    }
	 
	 @GetMapping("/customer/requests/{vendorId}")
	 public List<Order> getCustomersTOApproveRequest(@PathVariable int vendorId){
		 
		 return oservice.getCustomersToApproveRequest(vendorId);
	 }
	 
	 @PutMapping("/order/approve")
	 	public Order approveOrder(@RequestParam("oid")int orderId) throws Exception {
	 		return oservice.approveOrder(orderId);
	 	}
	 @PutMapping("/order/complete")
	 	public Order completeOrder(@RequestParam("oid")int orderId) {
	 		return oservice.completeOrder(orderId);
	 	}
	 
	 @PutMapping("/order/reject")
	 	public Order rejectOrder(@RequestParam("oid")int orderId) {
	 		return oservice.rejectOrder(orderId);
	 	}
	 
	 @GetMapping("/orders/completed/{customerId}")
	    public ResponseEntity<List<Order>> completedOrdersForCustomer(@PathVariable int customerId) {
	        List<Order> completedOrders = oservice.completedOrdersForCustomer(customerId);
	        return ResponseEntity.ok(completedOrders);
	    }
	 
	 @GetMapping("/orders/rejected/{customerId}")
	    public ResponseEntity<List<Order>>rejectedOrdersForCustomer(@PathVariable int customerId) {
	        List<Order> rejectedOrdewrs = oservice.rejectedOrdersForCustomer(customerId);
	        return ResponseEntity.ok(rejectedOrdewrs);
	    }
	 
	 @GetMapping("/orders/approved/{customerId}")
	    public ResponseEntity<List<Order>> approvedOrdersForCustomer(@PathVariable int customerId) {
	        List<Order> rejectedOrdewrs = oservice.approvedOrdersForCustomer(customerId);
	        return ResponseEntity.ok(rejectedOrdewrs);
	    }
	 
	 @GetMapping("/orders/pending/{vendorId}")
	    public ResponseEntity<List<Order>> pendingOrdersForVendor(@PathVariable int vendorId) {
	        List<Order> pendingOrders = oservice.pendingOrdersByVendor(vendorId);
	        return ResponseEntity.ok(pendingOrders);
	    }
	 
	 @PostMapping("/order/create_order")
		@ResponseBody
		public String createOrder(@RequestBody String data) throws RazorpayException {
			JSONObject jsonData = new JSONObject(data);
			int amount = jsonData.getInt("price");
			var client = new RazorpayClient("rzp_test_ErKyvwCv8ffUsZ","siTy0VzW8ex8TPcu8miMvAiW");
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("amount",amount*100);
			jsonObject.put("currency","INR");
			jsonObject.put("receipt","txn_235425");

			com.razorpay.Order create = client.orders.create(jsonObject);

			return create.toString();
		}

	 
}
