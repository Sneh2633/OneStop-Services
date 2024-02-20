package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.ServiceCost;
import com.example.demo.entities.Services;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.ServiceCostRepository;
import com.example.demo.repositories.ServicesRepository;
import com.example.demo.repositories.VendorRepository;
import com.example.demo.request.ServiceCostReq;

@Service
public class ServiceCostService {

	@Autowired
	ServiceCostRepository scr;
	
	@Autowired
	ServicesRepository sr;
	
	@Autowired
	VendorRepository vr;
	
	public ServiceCost saveServiceCost(ServiceCostReq screq) {
		Services s=sr.findById(screq.getService_id()).get();
		Vendor v=vr.findById(screq.getVendor_id()).get();	
		
		ServiceCost sc=new ServiceCost();
		sc.setCost(screq.getCost());
		sc.setService_id(s);
		sc.setVendor_id(v);
		return scr.save(sc);
	}

	public List<Vendor> findAllVendorsBasedOnServices(int subServiceId) {
		List<ServiceCost> serviceCosts  = scr.findAllByService_id(subServiceId);
		List<Vendor> vendors = new ArrayList<>();
		
		serviceCosts.forEach(serviceCost -> vendors.add(serviceCost.getVendor_id()));
		return vendors;
	}
}
