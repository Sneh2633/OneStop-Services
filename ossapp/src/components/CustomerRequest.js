import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CustomerRequests = () => {
    const user = useSelector((state) => state.logged.user);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Retrieve requests from local storage
        const storedRequests = JSON.parse(localStorage.getItem('customerRequests')) || [];
        setRequests(storedRequests);
    }, []);

    const handleAccept = (index) => {
        // Handle accept logic for the request at the given index
        console.log('Accept request at index:', index);
    };

    const handleReject = (index) => {
        // Handle reject logic for the request at the given index
        console.log('Reject request at index:', index);
    };

    return (
        <div>
            <h2>Customer Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vendor Id</th>
                        <th>Customer Id</th>
                        <th>Service Id</th>
                        <th>Booking Date</th>
                        <th>Status</th>
                        <th>Actions</th> {/* New column for accept and reject buttons */}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.vendorId}</td>
                            <td>{request.customerId}</td>
                            <td>{request.servicesId}</td>
                            <td>{request.bookingDatetime}</td>
                            <td>{request.status}</td>
                            <td>
                                <button onClick={() => handleAccept(index)}>Accept</button>
                                <button onClick={() => handleReject(index)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerRequests;
