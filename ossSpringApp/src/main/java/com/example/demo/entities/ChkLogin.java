package com.example.demo.entities;

public class ChkLogin {
	
	private String username,password;

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

	public ChkLogin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChkLogin(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	
}
