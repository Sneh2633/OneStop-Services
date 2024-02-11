package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="categories")
public class Service {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int service_id;
	
	public Service() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Service(String service_name) {
		super();
		this.service_name = service_name;
	}

	private String service_name;

	public int getService_id() {
		return service_id;
	}

	public void setService_id(int service_id) {
		this.service_id = service_id;
	}

	public String getService_name() {
		return service_name;
	}

	public void setService_name(String service_name) {
		this.service_name = service_name;
	}
	
	
}
