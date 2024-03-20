package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    private String username;
    private String password;
    
    @ManyToOne
    @JoinColumn(name="roleid")
    Role roleid;
    
    private boolean status;
    
    public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public User() {
		super();
	}
	public User(String username, String password, Role roleid, boolean status) {
		super();
		//this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.roleid = roleid;
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Role getRoleid() {
		return roleid;
	}
	public void setRoleid(Role roleid) {
		this.roleid = roleid;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	 
    
    
    
}
