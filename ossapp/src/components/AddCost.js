import React, { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddCost() {
  const initialState = {
    cost: { value: "", valid: false, touched: false, error: "" },
    subservice: { value: "", valid: false, touched: false, error: "" },
    service: { value: "", valid: false, touched: false, error: "" },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        const { key, value, touched, valid, error } = action.data;
        return { ...state, [key]: { value, touched, valid, error } };
      case "reset":
        return initialState;
      default:
        return state;
    }
  };

  const [bookings, dispatch] = useReducer(reducer, initialState);
  const [services, setServices] = useState([]);
  const [subservices, setSubservices] = useState([]);
  const [insertMsg, setInsertMsg] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.logged.user);

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
    //  const response = await fetch(`http://localhost:8080/getallsubservices`);
      if (response.ok) {
        const data = await response.json();
        setSubservices(data);
        console.log(data);
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
      case "subservice":
        if (!val) {
          valid = false;
          error = "Please select a subservice";
        }
        break;

      case "cost":
        var pattern = /^[0-9]{4}$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid Cost";
        }
        break;

      case "service":
        if (!val) {
          valid = false;
          error = "Please select a service";
        } else {
          fetchSubservices(val); // Fetch subservices based on selected service
        }
        break;

      default:
        break;
    }

    return { valid, error };
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
  };

  const submitData = () => {
    const isFormValid = Object.values(bookings).every((field) => field.valid);

    if (isFormValid) {
      const reqOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          cost: bookings.cost.value,
          service_id: parseInt(bookings.subservice.value),
          vendor_id : user.user_id,
        }),
      };

      fetch("http://localhost:8080/savecost", reqOptions)
        .then((res) => {
          if (res.ok) {
            setInsertMsg("Cost added successfully");
            // navigate("/adminhome");
          } else if (res.status === 400) {
            return res.json().then((data) => {
              console.error("Validation error:", data);
              setInsertMsg("Validation error. Please check your input.");
            });
          } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error.message);
          setInsertMsg("Subservice registration failed. Please try again later.");
        });
    } else {
      console.log("Form has validation errors. Please fix them before submitting.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData();
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setInsertMsg("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>Service Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3 mb-3">
              <label htmlFor="service" className="form-label">
                Category
              </label>
              <select
                id="service"
                name="service"
                className="form-control"
                value={bookings.service.value}
                onChange={(e) => handleChange("service", e.target.value)}
              >
                <option value="">Select</option>
                {services.map((service) => (
                  <option key={service.service_id} value={service.service_id}>
                    {service.service_name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ color: "Red", display: bookings.service.touched && !bookings.service.valid ? "block" : "none" }}>
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

            <div className="mt-3 mb-3">
              <label htmlFor="cost" className="form-label">
                Cost
              </label>
              <input
                type="text"
                id="cost"
                name="cost"
                className="form-control"
                value={bookings.cost.value}
                onChange={(e) => handleChange("cost", e.target.value)}
              />
            </div>
            <div style={{ color: "Red", display: bookings.cost.touched && !bookings.cost.valid ? "block" : "none" }}>
              {bookings.cost.error}
            </div>

            <div>
              <input type="submit" className="btn btn-primary btn-block" value="Register" />
              &nbsp;&nbsp;
              <button type="button" className="btn btn-primary btn-block" onClick={handleReset}>
                Clear
              </button>
            </div>
          </form>

          {insertMsg && (
            <div className="alert alert-success mt-3" role="alert">
              {insertMsg}
            </div>
          )}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
