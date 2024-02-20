package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Services;
import com.example.demo.repositories.ServicesRepository;

@Service
public class ServicesService {

	@Autowired
	ServicesRepository sr;
	
	public Services saveServices(Services s) {
		return sr.save(s);
	}
	
	public List<Services> findServices(int sid) {
		return sr.findByCatId(sid);
	}

	public List<Services> fetchallServices(){
		return sr.findAll();
	}
}
