package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Vendor;
import com.example.demo.repositories.VendorRepository;

@Service
public class VendorService {

	@Autowired
	VendorRepository vrepo;
	
	public Vendor saveVendor(Vendor v) {
		return vrepo.save(v);
	}
}
