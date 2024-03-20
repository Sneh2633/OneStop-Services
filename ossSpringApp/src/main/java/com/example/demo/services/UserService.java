package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository urepo;
	
	public User getLogin(String username,String password) throws Exception {
		User u;
		Optional<User>ol=urepo.chklogin(username, password);
		
		try {
			u=ol.get();
			if(u.isStatus()==false) {
				throw new Exception("Not approved!!");
			}
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			throw new Exception("Invalid Username or Password!!!");
		}
		
		
		return u;
	}
	
	public User save(User u) {
		return urepo.save(u);
	}
	
	public User getUser(int userid) {
		return urepo.findById(userid).get();
	}
}
