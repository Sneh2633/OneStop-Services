package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="services")
public class Services {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int service_id;
	
	String name;
	
	String description;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	Service category_id;
	
	

	public Services() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Services(String name, String description, Service category_id) {
		super();
		this.name = name;
		this.description = description;
		this.category_id = category_id;
	}

	public int getService_id() {
		return service_id;
	}

	public void setService_id(int service_id) {
		this.service_id = service_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Service getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Service category_id) {
		this.category_id = category_id;
	}
	
	
	
}
