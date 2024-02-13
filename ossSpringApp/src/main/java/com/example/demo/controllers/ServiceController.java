package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Service;
import com.example.demo.services.ServiceService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ServiceController {

	@Autowired
	ServiceService sservice;

	@GetMapping("/getServices")
	public List<Service> getServices(){
		return sservice.getAll();
	}
	
	@PostMapping("/addServices")
	public Service addService(@RequestBody Service s) {
		
		Service sr=new Service(s.getService_name());
		return sservice.saveService(sr);
	}
}
