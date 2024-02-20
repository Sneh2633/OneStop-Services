import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const initialState = {
    description: { value: "", valid: false, touched: false, error: "" },
    serviceName: { value: "", valid: false, touched: false, error: "" },
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
  const [insertMsg, setInsertMsg] = useState("");
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

  const validateData = (key, val) => {
    let valid = true;
    let error = "";

    switch (key) {
      case "serviceName":
        var pattern2 = /.+/;
        if (!pattern2.test(val)) {
          valid = false;
          error = "Invalid service name";
        }
        break;

      case "description":
        var pattern = /.+/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid description";
        }
        break;

      case "service":
        if (!val) {
          valid = false;
          error = "Please select a service";
        }
        break;

      default:
        break;
    }

    console.log(`Validation for ${key}: valid=${valid}, error=${error}`);
    return { valid, error };
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
    console.log("Updated State:", bookings);
  };

  const submitData = () => {
    const isFormValid = Object.values(bookings).every((field) => field.valid);

    if (isFormValid) {
      console.log(bookings);
      const reqOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: bookings.description.value,
          name: bookings.serviceName.value,
          categoryId: parseInt(bookings.service.value),
        }),
      };

      fetch("http://localhost:8080/addsubServices", reqOptions)
        .then((res) => {
          if (res.status === 200) {
            setInsertMsg("Subservice added successfully");
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
                onBlur={(e) => handleChange("service", e.target.value)}
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
              <label htmlFor="serviceName" className="form-label">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                className="form-control"
                value={bookings.serviceName.value}
                onChange={(e) => handleChange("serviceName", e.target.value)}
                onBlur={(e) => handleChange("serviceName", e.target.value)}
              />
            </div>
            <div style={{ color: "Red", display: bookings.serviceName.touched && !bookings.serviceName.valid ? "block" : "none" }}>
              {bookings.serviceName.error}
            </div>

            <div className="mt-3 mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={bookings.description.value}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div style={{ color: "Red", display: bookings.description.touched && !bookings.description.valid ? "block" : "none" }}>
              {bookings.description.error}
            </div>

            <div>
              <input type="submit" className="btn btn-primary btn-block" value="Register" />
              &nbsp;&nbsp;
              <input
                type="reset"
                className="btn btn-primary btn-block"
                value="Clear"
                onClick={() => {
                  dispatch({ type: "reset" });
                  setInsertMsg("");
                }}
              />
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