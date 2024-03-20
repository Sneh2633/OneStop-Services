import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { service_id } = useParams();
  const [serviceDetails, setServiceDetails] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/services/${service_id}`);
        if (response.ok) {
          const data = await response.json();
          setServiceDetails(data);
        } else {
          console.error("Failed to fetch service details. Status:", response.status);
          setError("Failed to fetch service details");
        }
      } catch (error) {
        console.error("Error fetching service details:", error.message);
        setError("Error fetching service details");
      }
    };

    fetchServiceDetails();
  }, [service_id]);

  const goBack = () => {
    navigate(-1); // Navigate back one step in the history stack
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1 className="mb-4">Service Details</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {Object.keys(serviceDetails).length > 0 && (
            <div>
              <p><strong>Service Name:</strong> {serviceDetails.name}</p>
              {/* <p><strong>Cost:</strong> {serviceDetails.cost}</p> */}
              <p><strong>Description:</strong> {serviceDetails.description}</p>
            </div>
          )}
          <button type="button" className="btn btn-primary" onClick={goBack}>
            Back
          </button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default ServiceDetails;
