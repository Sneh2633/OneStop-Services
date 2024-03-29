package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Vendor;
import com.example.demo.entities.feedback;
import com.example.demo.request.FeedbackDTO;
import com.example.demo.services.CustomerService;
import com.example.demo.services.FeedbackService;
import com.example.demo.services.VendorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FeedbackController {

	@Autowired
	FeedbackService fs;
	
	@Autowired
	CustomerService cs;
	
	@Autowired
	VendorService vs;
	
	  @GetMapping("/getFeedback/{vendorId}")
	    public List<feedback> getFeedbackByVendorId(@PathVariable int vendorId) {
	        return fs.getFeedbackByVendorId(vendorId);
	    }
	    
	    @PostMapping("/saveFeedback")
	    public feedback saveFeedback(@RequestBody FeedbackDTO fd) {
	    	
	    	 Vendor vendor = vs.findById(fd.getVendor_id());
	         
	         Customer customer = cs.findById(fd.getCustomer_id());
	         
	    	feedback f=new feedback(fd.getComments(),fd.getRating(),vendor,customer);
	      return  fs.saveFeedback(f);  
	    }
}
