import React, { useState, useEffect } from 'react';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [completionStatus, setCompletionStatus] = useState("");
  const vendorId = JSON.parse(localStorage.getItem("loggedVendor")).vendor_id;

  useEffect(() => {
    fetchPendingOrders();
  }, [vendorId, completionStatus]);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/pending/${vendorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pending orders");
      }
      const data = await response.json();
      console.log("Fetched pending orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching pending orders:", error.message);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order/complete?oid=${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to complete order");
      }
      console.log(response.body);
      setCompletionStatus("Order Completed successfully.");
    } catch (error) {
      console.error("Error completing order:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center pb-3">Pending Orders</h1>
      {orders.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark text-center">
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_id.customer_id}</td>
                <td>{order.customer_id.fname} {order.customer_id.lname}</td>
                <td>{order.customer_id.email}</td>
                <td>{order.customer_id.contact_number}</td>
                <td>
                  <button className="btn btn-success" onClick={() => completeOrder(order.order_id)}>Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">
          No pending orders available.
        </div>
      )}
      {completionStatus && <div className="alert alert-success mt-3 text-center">{completionStatus}</div>}
    </div>
  );
};

export default PendingOrders;
