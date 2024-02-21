import React, { useState, useEffect } from "react";

const ApproveVendor = () => {
    const [vendors, setVendors] = useState([]);
    const [approvalStatus, setApprovalStatus] = useState("");

    useEffect(() => {
        fetchVendors();

    }, []);

    const fetchVendors = async () => {
        try {
            const response = await fetch("http://localhost:8080/approveVendors");
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

    const approveVendor = async (vendorId) => {
        try {
            const response = await fetch(`http://localhost:8080/approveVendors/${vendorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ approved: true })
            });
            if (!response.ok) {
                throw new Error("Failed to approve vendor");
            }
            console.log(response.body);
            setApprovalStatus("Vendor with ID ${vendorId} approved successfully.");
            fetchVendors();
        } catch (error) {
            console.error("Error approving vendor:", error.message);
            setApprovalStatus(`Failed to approve vendor with ID ${vendorId}.`);
        }
    };

    const rejectVendor = async (vendorId) => {
        try {
            const response = await fetch(`http://localhost:8080/approveVendors/${vendorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ approved: false })
            });
            if (!response.ok) {
                throw new Error("Rejection Failed");
            }
            console.log(response.body);
            setApprovalStatus("Vendor with ID ${vendorId} rejected successfully.");
            fetchVendors();
        } catch (error) {
            console.error("Error rejecting vendor:", error.message);
            setApprovalStatus("Rejection Failed");
        }
    };

    return (
        <div className="container">
            <h1>Vendor List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Vendor ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Service Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.vendor_id}>
                            <td>{vendor.vendor_id}</td>
                            <td>{vendor.fname}</td>
                            <td>{vendor.lname}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.address}</td>
                            <td>{vendor.contact_number}</td>
                            <td>{vendor.serviceid.service_name}</td>
                            <td>
                                <button onClick={() => approveVendor(vendor.vendor_id)}>Approve</button>
                            </td>
                            <td>
                                <button onClick={() => rejectVendor(vendor.vendor_id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {approvalStatus && <div>{approvalStatus}</div>}
        </div>
    );
};

export default ApproveVendor;