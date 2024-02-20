package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ServiceCost;
import com.example.demo.request.ServiceCostReq;
import com.example.demo.request.ServiceCostUpdateRequest;
import com.example.demo.services.ServiceCostService;


@CrossOrigin
@RestController
public class ServiceCostController {

	@Autowired
	ServiceCostService scs;
	
	@PostMapping("/savecost")
	public ServiceCost saveCost(@RequestBody ServiceCostReq screq) {
		
		System.out.println(screq);
		
		return scs.saveServiceCost(screq);
	}
			
	
	@GetMapping("/serviceCost/{vendorId}")
	 public List<ServiceCost> getAllServiceCostByVendor(@PathVariable int vendorId){
	 
	 return scs.findAllServiceCostByVendor(vendorId);
	 
}
	
	@PutMapping("/updatecost")
	public ServiceCost updateCost(@RequestBody ServiceCostUpdateRequest updatedCost) {
		return scs.updateCost(updatedCost);
	}
	
}
