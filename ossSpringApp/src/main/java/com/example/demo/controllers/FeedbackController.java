package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.feedback;
import com.example.demo.services.FeedbackService;

@RestController
public class FeedbackController {

	@Autowired
	FeedbackService fs;
	
	  @GetMapping("/getFeedback/{vendorId}")
	    public List<feedback> getFeedbackByVendorId(@PathVariable int vendorId) {
	        return fs.getFeedbackByVendorId(vendorId);
	    }
	    
	  /*@PostMapping("/saveFeedback")
	    public feedback saveFeedback(@RequestBody feedback feedback) {
	        return fs.saveFeedback(feedback);
	    }*/
}
