package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.VendorRepository;

@Service
public class VendorService {

	@Autowired
	VendorRepository vrepo;
	
	@Autowired
	UserRepository urepo;
	
	public Vendor saveVendor(Vendor v) {
		return vrepo.save(v);
	}
	
	 public List<Vendor> getAllVendors() {
	        return vrepo.findAll();
	    }
	 public List<Vendor>getVendors(){
		 List<Vendor>vendors =  vrepo.getVendors();
		 vendors.forEach(vendor->vendor.getServiceid().getService_name());
		 return vendors;
	 }

	public Vendor changeStatusById(Integer id) {
		Vendor vendor = vrepo.findById(id).orElseThrow();
		vendor.getUser_id().setStatus(true);
		urepo.save(vendor.getUser_id());
		
		return vendor;
	}
	
	//to give vendors list by service id
	public List<Vendor> getVendorsByServiceId(int serviceid) {
       return vrepo.findByServiceId(serviceid);
   }

	//add required methods here
	
	//added some code
	   
}
