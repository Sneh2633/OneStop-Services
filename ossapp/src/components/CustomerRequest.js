import React, { useState, useEffect } from 'react';

const CustomerRequests = ({ vendorId }) => {
    const [vendors, setVendors] = useState([]);
    const [approvalStatus, setApprovalStatus] = useState("");

    useEffect(() => {
        fetchCustomers();

    }, [vendorId]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/customer-details/vendor/${vendorId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch vendors");
            }
            const data = await response.json();
            console.log("Fetched vendors:", data); // Debug logging
            setVendors(data);
        } catch (error) {
            console.error("Error fetching vendors:", error.message);
        } 
    };

    const approveCustomer = async (vendorId) => {
        try {
            const response = await fetch(`http://localhost:8080/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ approved: true })
            });
            if (!response.ok) {
                throw new Error("Failed to approve customer");
            }
            console.log(response.body);
            setApprovalStatus("Approved successfully.");
            fetchCustomers();
        } catch (error) {
            console.error("Error approving customer:", error.message);
            setApprovalStatus("Failed to Approve");
        }
    };

    return (
        <div className="container">
            <h1>Vendor List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>customer_id</th>
                        <th>user_id</th>
                        <th>fname</th>
                        <th>lname</th>
                        <th>email</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.customer_id}>
                            <td>{vendor.user_id}</td>
                            <td>{vendor.fname}</td>
                            <td>{vendor.lname}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.Contact}</td>
                            <td>{vendor.contact_number}</td>
                            <td>{vendor.serviceid.service_name}</td>
                            <td>
                                <button onClick={() => approveCustomer(vendor.vendor_id)}>Approve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {approvalStatus && <div>{approvalStatus}</div>}
        </div>
    );
};

export default CustomerRequests;
