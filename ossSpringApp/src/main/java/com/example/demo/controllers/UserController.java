package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ChkLogin;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService uservice;
	
	@PostMapping("/chklogin")
	public ResponseEntity<?> chklogin(@RequestBody ChkLogin clogin)  {
		User u = new User();
		try {
			
		u=	uservice.getLogin(clogin.getUsername(), clogin.getPassword());
		}catch(Exception e) {
			return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		return ResponseEntity.ok(u);
	}
	
}
