package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ServiceCost;
import com.example.demo.request.ServiceCostReq;
import com.example.demo.services.ServiceCostService;

@RestController
public class ServiceCostController {

	@Autowired
	ServiceCostService scs;
	
	@PostMapping("/savecost")
	public ServiceCost saveCost(@RequestBody ServiceCostReq screq) {
		
		 
		
		return scs.saveServiceCost(screq);
			
	}
}
