package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Service;
import com.example.demo.entities.Services;
import com.example.demo.repositories.ServiceRepository;
import com.example.demo.repositories.ServicesRepository;
import com.example.demo.request.SubServiceRequest;
import com.example.demo.services.ServiceService;
import com.example.demo.services.ServicesService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ServicesController {
	
	
	@Autowired
	ServicesService ss;
	
	@Autowired
	ServiceService sr;
	
	

	
	@PostMapping("/addsubServices")
	public Services addSubService(@RequestBody SubServiceRequest s) {
		
		Service parentService = sr.getById(s.getCategoryId());
		Services subService=new Services(s.getName(),s.getDescription(),parentService);
		System.out.println(subService);
		return ss.saveServices(subService);
	}
	
	 

}
