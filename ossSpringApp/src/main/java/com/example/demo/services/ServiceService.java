package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.example.demo.entities.Service;
import com.example.demo.entities.User;
import com.example.demo.repositories.ServiceRepository;

@Service
public class ServiceService {
	
	@Autowired
	ServiceRepository srepo;
	
	
	public List<com.example.demo.entities.Service> getAll() {
		return srepo.findAll();
	}
	
	public com.example.demo.entities.Service getById(int id){
		return srepo.findById(id).get();
	}
	
	public com.example.demo.entities.Service saveService(com.example.demo.entities.Service s){
		return srepo.save(s);
	}
}
