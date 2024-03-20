import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
            console.log("Fetched vendors:", data);
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
            setApprovalStatus(`Vendor with ID ${vendorId} approved successfully.`);
            fetchVendors();
        } catch (error) {
            console.error("Error approving vendor:", error.message);
            setApprovalStatus(`Failed to approve vendor with ID ${vendorId}.`);
        }
    };

    const rejectVendor = async (vendorId) => {
        try {
            const response = await fetch(`http://localhost:8080/rejectVendors/${vendorId}`, {
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
            setApprovalStatus(`Vendor with ID ${vendorId} rejected successfully.`);
            fetchVendors();
        } catch (error) {
            console.error("Error rejecting vendor:", error.message);
            setApprovalStatus("Rejection Failed");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center pb-3">Vendor List</h1>
            {vendors.length === 0 ? (
                <div className="alert alert-info text-center">No vendors available for approval.</div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark text-center">
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
                    <tbody className="text-center">
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
                                    <button style={{ marginRight: '10px' }} className="btn btn-success" onClick={() => approveVendor(vendor.vendor_id)}>Approve</button>
                                    <button className="btn btn-danger" onClick={() => rejectVendor(vendor.vendor_id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {approvalStatus && (
                <div className={`alert ${approvalStatus.includes("successfully") ? 'alert-success' : 'alert-danger'}`}>{approvalStatus}</div>
            )}
        </div>
    );
};

export default ApproveVendor;
