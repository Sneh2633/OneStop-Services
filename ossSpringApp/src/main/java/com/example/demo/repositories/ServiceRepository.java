package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Service;
import com.example.demo.services.ServiceService;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {

	

}
