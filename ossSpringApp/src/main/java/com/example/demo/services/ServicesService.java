package com.example.demo.services;

<<<<<<< HEAD
import java.util.List;
=======
import java.util.Optional;
>>>>>>> 328a9c0d42f73e56878ead4a9bf8f65bea78990e

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
	
<<<<<<< HEAD
	public List<Services> findServices(int sid) {
		return sr.findByCatId(sid);
	}

	public List<Services> fetchallServices(){
		return sr.findAll();
	}
=======
	 public Services findById(int id) {
	        Optional<Services> services = sr.findById(id);
	        return services.orElse(null);
	    }
>>>>>>> 328a9c0d42f73e56878ead4a9bf8f65bea78990e
}
