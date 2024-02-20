package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="service_cost")
public class ServiceCost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int service_costid;
	
	double cost;
	
	@ManyToOne
	@JoinColumn(name="service_id")
	Services service_id;
	
	@ManyToOne
	@JoinColumn(name="vendor_id")
	Vendor vendor_id;
}
