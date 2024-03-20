import React, { useState, useEffect } from 'react';

const CustomerRequests = () => {
  const [orders, setOrders] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState("");
  const vendorId = JSON.parse(localStorage.getItem("loggedVendor")).vendor_id;

  useEffect(() => {
    fetchOrders();
  }, [vendorId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/customer/requests/${vendorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }
      const data = await response.json();
      console.log("Fetched customers:", data); // Debug logging
      setOrders(data);
    } catch (error) {
      console.error("Error fetching vendors:", error.message);
    }
  };

  const approveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order/approve?oid=${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to approve customer");
      }
      console.log(response.body);
      setApprovalStatus("Approved successfully.");
      fetchOrders();
    } catch (error) {
      console.error("Error approving customer:", error.message);
      setApprovalStatus("Failed to Approve");
    }
  };

  const rejectOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order/reject?oid=${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to approve order");
      }
      console.log(response.body);
      setApprovalStatus("Order Rejected successfully.");
      fetchOrders();
    } catch (error) {
      console.error("Error rejecting order:", error.message);
      setApprovalStatus("Failed to reject order");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center pb-3">Customer Requests</h1>
      {orders.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark text-center">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.customer_id.customer_id}</td>
                <td>{order.customer_id.fname} {order.customer_id.lname}</td>
                <td>{order.customer_id.email}</td>
                <td>{order.customer_id.contact_number}</td>
                <td>
                  <button style={{ marginRight: '10px' }} className="btn btn-success" onClick={() => approveOrder(order.order_id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => rejectOrder(order.order_id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">
          No customer requests available.
        </div>
      )}
      {approvalStatus && <div className="alert alert-success mt-3">{approvalStatus}</div>}
    </div>
  );
};

export default CustomerRequests;
