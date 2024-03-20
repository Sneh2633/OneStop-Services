package com.example.demo.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.ServiceCost;
import com.example.demo.entities.Services;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.ServiceCostRepository;
import com.example.demo.repositories.ServicesRepository;
import com.example.demo.repositories.VendorRepository;

@Service
public class ServicesService {

	@Autowired
	ServicesRepository sr;
	
	@Autowired
	private ServiceCostRepository scr;
	
	@Autowired
	private VendorRepository vr;
	
	public Services saveServices(Services s) {
		return sr.save(s);
	}
	

	public List<Services> findServices(int sid) {
		return sr.findByCatId(sid);
	}

	public List<Services> fetchallServices(){
		return sr.findAll();
	}
	 public Services findById(int id) {
	        Optional<Services> services = sr.findById(id);
	        return services.orElse(null);
	    }
	 
	 public List<Services> getServicesByCategoryId(int categoryId) {
	        return sr.findByCategoryId(categoryId);
	    }


//	public List<Services> findAllServicesByVendor(int vendorId) {
//		Vendor v = vr.findById(vendorId).orElseThrow();
//		
//		List<ServiceCost> scList = scr.findAllByVendor_id(v);
//		
//		List<Services> services = new ArrayList<Services>();
//		scList.forEach(sc ->
//			services.add(sr.findById(sc.getService_id().getService_id()).orElseThrow())
//				);
//		
//		return services;
//	}
	 
	 public Services getServicesById(int serviceId) {
		 return sr.findById(serviceId).orElseThrow();
	 }

}
