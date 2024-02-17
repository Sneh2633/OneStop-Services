package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Services;
import com.example.demo.entities.Vendor;
import com.example.demo.entities.feedback;
import com.example.demo.repositories.FeedbackRepository;
import com.example.demo.request.FeedbackDTO;

@Service
public class FeedbackService {

	@Autowired
	FeedbackRepository fr;
	
	public List<feedback> getFeedbackByVendorId(int vendorId) {
        return fr.findByVendorId(vendorId);
    }
	
	public feedback saveFeedback(feedback f) {
		return fr.save(f);
	}
  
}
