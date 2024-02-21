import React, { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SearchVendor() {

    //const custid = JSON.parse(localStorage.getItem("loggedCustomer")).customer_id;
    const loggedCustomer = JSON.parse(localStorage.getItem("loggedCustomer"));
    const custid = loggedCustomer?.customer_id || ''; // provide a default value if customer_id is not available

    const init = {
        service: { value: "", valid: false, touched: false, error: "" },
        subservice: { value: "", valid: false, touched: false, error: "" }
    };

    const user = useSelector((state) => state.logged.user);

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
    const [subservices, setSubservices] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(null); // State to store selected service ID
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

    const fetchVendors = async (subserviceId) => {
        try {
            const response = await axios.get(`http://localhost:8080/servicecost/vendors`, {
                params: { subserviceId: subserviceId }
            });
            if (response.status === 200) {
                const data = response.data;
                setVendors(data);
            } else {
                console.error("Failed to fetch vendors. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching vendors:", error.message);
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

    const handleChange = async (key, value) => {
        const { valid, error } = validateData(key, value);
        dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
        if (key === "service" && valid) {
            setSelectedServiceId(value); // Store selected service ID
            fetchSubservices(value);
        }
        if (key === "subservice" && valid) {
            fetchVendors(value);
        }
    };

    const handleRequest = async () => {
        try {
            // Get the current date and time in the required format
            const bookingDatetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    
            // Extract data needed for the order from state and other variables
            const orderData = {
                vendorId: vendors[0].vendor_id, // Assuming the vendor is selected from the first item in the vendors array
                customerId: custid,
                servicesId: bookings.subservice.value, // Use selected service ID from state
                bookingDatetime: bookingDatetime,
                status: 0, // Set status to 0 for the first request
            };
    
            // Send a POST request to save the order
            const response = await fetch("http://localhost:8080/saveOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
    
            // Check if the request was successful
            if (response.ok) {
                setInsertMsg("Order placed successfully!"); // Set a message indicating success
            } else {
                console.error("Failed to place order. Status:", response.status); // Log an error if the request fails
            }
        } catch (error) {
            console.error("Error placing order:", error.message); // Log any errors that occur during the process
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

                    {vendors.length > 0 &&  (
                        <div>
                            <h2>Vendors</h2>
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
                                    {vendors.map((vendor) => (
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
}



