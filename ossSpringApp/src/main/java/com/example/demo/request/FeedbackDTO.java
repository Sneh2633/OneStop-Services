package com.example.demo.request;

import lombok.Data;

@Data
public class FeedbackDTO {

	private String comments;
    private int rating;
    private int vendor_id;
    private int customer_id;
}
