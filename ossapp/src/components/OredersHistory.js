import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const OrderHistory = () => {
  const custid = JSON.parse(localStorage.getItem("loggedCustomer")).customer_id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/orders/completed/${custid}`);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error('Failed to fetch order history. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching order history:', error.message);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order History</h2>
      {orders.length === 0 ? (
       <div className="alert alert-info text-center">No order history available.</div>
      ) : (
        <table className="table table-bordered table-striped">
        <thead className="thead-dark text-center">
            <tr>
              <th>Order Id</th>
              <th>Vendor</th>
              <th>Service</th>
              <th>Service Status</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.vendor_id.fname} {order.vendor_id.lname}</td>
                <td>{order.service_id.name}</td>
                <td>{order.status === 2 ? 'Completed' : ''}</td>
                <td>{new Date(order.booking_datetime).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
