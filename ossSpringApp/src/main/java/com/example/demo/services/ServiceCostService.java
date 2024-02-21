package com.example.demo.services;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.ServiceCost;
import com.example.demo.entities.Services;
import com.example.demo.entities.User;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.ServiceCostRepository;
import com.example.demo.repositories.ServicesRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.VendorRepository;
import com.example.demo.request.ServiceCostReq;
import com.example.demo.request.ServiceCostRequestForVendors;
import com.example.demo.request.ServiceCostUpdateRequest;

@Service
public class ServiceCostService {

	@Autowired
	ServiceCostRepository scr;
	
	@Autowired
	ServicesRepository sr;
	
	@Autowired
	VendorRepository vr;
	
	@Autowired
	private UserRepository ur;
	
	public ServiceCost saveServiceCost(ServiceCostReq screq) {
		Services s=sr.findById(screq.getService_id()).get();
		User u=ur.findById(screq.getVendor_id()).get();	
		
		Vendor v  = vr.findVendor(u);
		
		ServiceCost sc=new ServiceCost();
		sc.setCost(screq.getCost());
		sc.setService_id(s);
		sc.setVendor_id(v);
		return scr.save(sc) ;
	}

	public ServiceCost updateCost(ServiceCostUpdateRequest updatedCost) {
		
		double cost1 = updatedCost.getCost();
		ServiceCost s =scr.findById(updatedCost.getServiceCostId()).orElseThrow();
		s.setCost(cost1);
		return scr.save(s);
	}

	public List<ServiceCost> findAllServiceCostByVendor(int vendorId) {
		
		User u =ur.findById(vendorId).orElseThrow();
		
		Vendor v = vr.findVendor(u);
		
		List<ServiceCost> allServiceCostByVendor = scr.findAllByVendor_id(v);
		return allServiceCostByVendor;
	}

	public List<Vendor> findAllVendorsBasedOnServices(int request) {
		Services subService = sr.findById(request).orElseThrow();
		List<ServiceCost> serviceCosts  = scr.findAllByService_id(subService);
		List<Vendor> vendors = new ArrayList<>();
		
		serviceCosts.forEach(serviceCost -> vendors.add(serviceCost.getVendor_id()));
		return vendors;
	}
	
	//service details
		public List<Object[]> findServiceDetailsByServiceId(int serviceId) {
	        return scr.findServiceDetailsByServiceId(serviceId);
	    }
}
