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
@Table(name="feedback")
public class feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int feedback_id;
	
	String comments;
	int rating;
	
	@ManyToOne
	@JoinColumn(name="vendor_id")
	Vendor vendor_id;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	Customer customer_id;
}
