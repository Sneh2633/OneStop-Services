package com.example.demo.request;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class OrderDTO {
	
    private int customerId;
    private int vendorId;
    private int servicesId;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date bookingDatetime;
    private int status;
}
