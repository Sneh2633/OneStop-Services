package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.entities.Service;
import com.example.demo.entities.User;
import com.example.demo.entities.Vendor;
import com.example.demo.entities.VendorRegistration;
import com.example.demo.services.RoleService;
import com.example.demo.services.ServiceService;
import com.example.demo.services.UserService;
import com.example.demo.services.VendorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VendorController {
	@Autowired
	VendorService vservice;

	@Autowired
	UserService uservice;
	
	@Autowired
	RoleService rservice;
	
	@Autowired
	ServiceService sservice;
	
	@PostMapping("/regVendor")
	public Vendor regVendor(@RequestBody VendorRegistration vr) {
		Role r=rservice.getRole(3);
		User u=new User(vr.getUsername(),vr.getPassword(),r,false);
		User saved=uservice.save(u);
		
		Service s = sservice.getById(vr.getServiceid());
		
		Vendor v=new Vendor(vr.getFname(),vr.getLname(),vr.getAddress(),vr.getEmail(),vr.getContact(),saved,s);
		return vservice.saveVendor(v);
	}
	
	@GetMapping("/approveVendors")
	public List<Vendor> getVendors() {
		return vservice.getVendors();
	}
	
	@PutMapping("/approveVendors/{id}")
	public Vendor changeStatus(@PathVariable Integer id) {
		return vservice.changeStatusById(id);
	}
	
	//get vendors list by serviceid
	 @GetMapping("getVendor/{serviceid}")
	 public List<Vendor> getVendorsByServiceId(@PathVariable int serviceid) {
	        return vservice.getVendorsByServiceId(serviceid);
	    }
	 
	 @GetMapping("/getVendor")
	 public Vendor getVendor(@RequestParam("userid")int userid)
	 {
		 User u = uservice.getUser(userid);
		 return vservice.findVendor(u);
	 }
	
}