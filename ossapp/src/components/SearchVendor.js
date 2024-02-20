import React, { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function SearchVendor() {
    const init = {
        service: { value: "", valid: false, touched: false, error: "" },
        subservice: { value: "", valid: false, touched: false, error: "" }
    };

    const user = useSelector((state) => state.logged.user);
    console.log('from search vendor' + user);

    const reducer = (state, action) => {
        switch (action.type) {
            case "update":
                const { key, value, touched, valid, error } = action.data;
                return { ...state, [key]: { value, touched, valid, error } };
            case "reset":
                return init;
            default:
                return state;
        }
    };

    const [bookings, dispatch] = useReducer(reducer, init);
    const [insertMsg, setInsertMsg] = useState("");
    const [services, setServices] = useState([]);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [subservices, setSubservices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:8080/getServices");
                if (response.ok) {
                    const data = await response.json();
                    setServices(data);
                } else {
                    console.error("Failed to fetch services. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching services:", error.message);
            }
        };

        fetchServices();
    }, []);

    const fetchSubservices = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8080/category/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                setSubservices(data);
            } else {
                console.error("Failed to fetch subservices. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching subservices:", error.message);
        }
    };

    const validateData = (key, val) => {
        let valid = true;
        let error = "";

        switch (key) {
            case "service":
                if (!val) {
                    valid = false;
                    error = "Please select a service";
                }
                break;

            case "subservice":
                if (!val) {
                    valid = false;
                    error = "Please select a subservice";
                }
                break;

            default:
                break;
        }

        return { valid: valid, error: error };
    };

    useEffect(() => {
        if (bookings.service.valid) {
            fetchServiceDetails();
        }
    }, [bookings.service.valid]);

    const fetchServiceDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getVendor/${bookings.service.value}`);
            if (response.ok) {
                const data = await response.json();
                setServiceDetails(data);
            } else {
                console.error("Failed to fetch service details. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching service details:", error.message);
        }
    };

    const handleChange = async (key, value) => {
        const { valid, error } = validateData(key, value);
        dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
        console.log('category id ' +key)
        if (key === "service" && valid) {
            try {
                const response = await fetch(`http://localhost:8080/category/${value}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('subservices'+data);
                    setServiceDetails(data);
                } else {
                    console.error("Failed to fetch service details. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching service details:", error.message);
            }
        }
    };

    const handleRequest = async () => {
        try {
            const bookingDatetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            const response = await fetch("http://localhost:8080/saveOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vendorId: serviceDetails[0].vendor_id,
                    customerId: user.user_id,
                    servicesId: bookings.service.value,
                    bookingDatetime: bookingDatetime,
                    status: 0,
                }),
            });

            const existingRequests = JSON.parse(localStorage.getItem('customerRequests')) || [];
            existingRequests.push(response);
            localStorage.setItem('customerRequests', JSON.stringify(existingRequests));

            if (response.ok) {
                setInsertMsg("Order placed successfully!");
            } else {
                console.error("Failed to place order. Status:", response.status);
            }
        } catch (error) {
            console.error("Error placing order:", error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h1> Search Vendor </h1>
                    <form>
                        <div className="mt-3 mb-3">
                            <label htmlFor="service" className="form-label"> Category </label>
                            <select
                                id="service"
                                name="service"
                                className="form-control"
                                value={bookings.service.value}
                                onChange={(e) => {
                                    handleChange("service", e.target.value);
                                    fetchServiceDetails();
                                }}
                                onBlur={(e) => {
                                    handleChange("service", e.target.value);
                                }}
                            >
                                <option value="">Select</option>
                                {services.map((service) => (
                                    <option key={service.service_id} value={service.service_id}>
                                        {service.service_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ color: "red" }}>
                            {bookings.service.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="subservice" className="form-label">
                                SubServices
                            </label>
                            <select
                                id="subservice"
                                name="subservice"
                                className="form-control"
                                value={bookings.subservice.value}
                                onChange={(e) => handleChange("subservice", e.target.value)}
                            >
                                <option value="">Select</option>
                                {subservices.map((subservice) => (
                                    <option key={subservice.service_id} value={subservice.service_id}>
                                        {subservice.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ color: "Red", display: bookings.subservice.touched && !bookings.subservice.valid ? "block" : "none" }}>
                            {bookings.subservice.error}
                        </div>
                    </form>

                    {serviceDetails && (
                        <div>
                            <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Vendor Id</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fname</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Lname</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Contact</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>ViewFeedback</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>ServiceDetails</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>MakeRequest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceDetails.map((vendor) => (
                                        <tr key={vendor.vendor_id}>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.vendor_id}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.fname}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.lname}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.email}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.address}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vendor.contact_number}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}><Link to={`/customerhome/searchvendors/VendorFeedback/${vendor.vendor_id}`}>VendorFeedback</Link></td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}><Link to="/customerhome/searchvendors/ServiceCost">serviceDetails</Link></td>
                                            <td>
                                                <button type="button" className="btn btn-success" onClick={() => handleRequest()}>Request</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="col"></div>
            </div>
            <h1> {insertMsg} </h1>
        </div>
    );
};
