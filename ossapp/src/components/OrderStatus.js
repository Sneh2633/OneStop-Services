import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './OrderStatus.css'; // Import custom CSS for OrderStatus
// import { Box,  Stack } from '@chakra-ui/react'
// import Card from './Card';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const OrderStatus = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState("");
    const customerId = JSON.parse(localStorage.getItem("loggedCustomer")).customer_id;

    const createOrder = async (price) => {
        try {
          const response = await fetch('http://localhost:8080/order/create_order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ price: price })
        });
          const data = await response.json();
          return data.id;
        } catch (error) {
          console.error("Error creating order:", error);
        }
      };

      //this checkOutHandler is called when clicked on Buy Now button
      const checkOutHandler = async (amount) => {
        try{
        const order = await createOrder(amount);

        // const { data: { key } } = await axios.get("http://localhost:4000/api/getKey")

        // console.log("got key")

        // const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
        //     amount
        // })

        // console.log("done payment")
       
// created options for razorpay instance we will give all these options to razorpay api
        var options = {
            key:"rzp_test_ErKyvwCv8ffUsZ",
            amount: 5000,
            currency: "INR",
            name: "Amit Lakade",
            description: "Test Transaction",
            image: "https://media.istockphoto.com/id/808070602/photo/hand-holding-mobile-with-pay-word-and-bill-icon-feature-with-blur-back-office-counter.jpg?b=1&s=612x612&w=0&k=20&c=SWqJtyuC8479Cqsvi1kcbZzQgv-BCyTdG3JRGgpU9dw=",
            order_id:order,
            handler: function (response) {
                razor.close();},
            // callback_url: "http://localhost:4000/api/paymentverification", // after payemnt done this url is called
            prefill: {
                name: "Amit Lakade",
                email: "amitlakade@gmail.com",
                contact: "9168830229"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };

// It will open pop up window  with options to do payment
        const razor = new window.Razorpay(options);

        razor.open();
    }catch (error) {
        console.error("Error handling payment:", error);
      }
        

    }
    useEffect(() => {
        fetchPendingOrders();
        fetchRejectedOrders();
    }, [customerId, paymentStatus]);

    const fetchPendingOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/approved/${customerId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch pending orders");
            }
            const data = await response.json();
            console.log("Fetched pending orders:", data);
            setPendingOrders(data);
        } catch (error) {
            console.error("Error fetching pending orders:", error.message);
        }
    };

    const fetchRejectedOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/rejected/${customerId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch rejected orders");
            }
            const data = await response.json();
            console.log("Fetched rejected orders:", data);
            setRejectedOrders(data);
        } catch (error) {
            console.error("Error fetching rejected orders:", error.message);
        }
    };

    

    return (
        <div className="container mt-5">
            
            <div className="row">
                <div className="col-md-12 mt-4">
                    <h2 className="text-center mb-3">Pending Services</h2>
                    {pendingOrders.length > 0 ? (
                        <table className="table table-bordered table-striped">
                        <thead className="thead-dark text-center">
                                <tr>
                                    <th className="custom-column">Order ID</th>
                                    <th className="custom-column">Vendor</th>
                                    <th className="custom-column">Contact</th>
                                    <th className="custom-column">Service</th>
                                    <th className="custom-column">Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {pendingOrders.map((order) => (
                                    
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.vendor_id.fname} {order.vendor_id.lname}</td>
                                        <td>{order.vendor_id.contact_number}</td>
                                        <td>{order.service_id.name}</td>
                                        <td>
                                            {order.status === 1 && (
                                                 <Button onClick={()=>checkOutHandler(5000)} >Pay Now</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info text-center">No pending orders available.</div>
                    )}
                </div>
                <div className="col-md-12 mt-4">
                    <h2 className="text-center mb-3">Rejected Orders</h2>
                    {rejectedOrders.length > 0 ? (
                         <table className="table table-bordered table-striped">
                         <thead className="thead-dark text-center">
                                <tr>
                                    <th className="custom-column">Order ID</th>
                                    <th className="custom-column">Vendor</th>
                                    <th className="custom-column">Contact</th>
                                    <th className="custom-column">Service</th>
                                    <th className="custom-column">Order Status</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {rejectedOrders.map((order) => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.vendor_id.fname} {order.vendor_id.lname}</td>
                                        <td>{order.vendor_id.contact_number}</td>
                                        <td>{order.service_id.name}</td>
                                        <td>Rejected</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info text-center">No rejected orders available.</div>
                    )}
                </div>
            </div>
            {paymentStatus && (
                <div className={`alert ${paymentStatus.includes("successful") ? 'alert-success' : 'alert-danger'} mt-3`}>
                    {paymentStatus}
                </div>
            )}
        </div>
    );
};

export default OrderStatus;
