package com.example.demo.entities;

import java.util.Date;
//import java.util.Locale.Category;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="orders")
public class Order {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    //@Column(name = "order_id")
	    private int order_id;

	    @ManyToOne
	    @JoinColumn(name = "customer_id")
	    private Customer customer_id;

	    @ManyToOne
	    @JoinColumn(name = "vendor_id")
	    private Vendor vendor_id;

	    @ManyToOne
	    @JoinColumn(name = "service_id")
	    private Services service_id;

	    //@Column(name = "booking_datetime")
	    private Date booking_datetime;

	   // @Column(name = "status")
	    private int status;

		public Order(Customer customer_id, Vendor vendor_id, Services service_id, Date booking_datetime, int status) {
			super();
			this.customer_id = customer_id;
			this.vendor_id = vendor_id;
			this.service_id = service_id;
			this.booking_datetime = booking_datetime;
			this.status = status;
		}


	    

}
