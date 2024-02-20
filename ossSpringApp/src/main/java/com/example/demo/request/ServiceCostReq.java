package com.example.demo.request;

import lombok.Data;

@Data
public class ServiceCostReq {

	double cost;
	int service_id;

	int vendor_id;
}
