import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UpdateService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [oldCost, setOldCost] = useState('');
  const [newCost, setNewCost] = useState('');

  // Replace 'yourVendorId' with the actual vendor ID
  const user = useSelector((state) => state.logged.user);
  const vendorId = user.user_id;

  useEffect(() => {
    // Fetch services based on vendor ID
    fetch(`http://localhost:8080/serviceCost/${vendorId}`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, [vendorId]);

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    setSelectedService(serviceId);
    // Set the old and new cost to the currently selected service's cost
    const selectedServiceData = services.find((service) => service.service_costid === serviceId);
   
    if (selectedServiceData) {
      setOldCost(selectedServiceData.cost.toString());
      setNewCost(selectedServiceData.cost.toString());
    }
  };

  const handleNewCostChange = (event) => {
    setNewCost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure that a service is selected
    if (!selectedService) {
      console.error('Please select a service.');
      return;
    }

    // Create the update data object
    const updateData = {
      serviceCostId: parseInt(selectedService), // Ensure the serviceCostId is parsed as an integer
      cost: parseFloat(newCost), // Ensure the cost is parsed as a float
    };

    // Send update request to the backend
    fetch('http://localhost:8080/updatecost', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Cost updated successfully');
          // You might want to perform additional actions after a successful update
        } else {
          console.error('Failed to update cost. Status:', response.status);
        }
      })
      .catch((error) => console.error('Error updating cost:', error));
  };

  return (
    <div className="update-service-container">
      <h1 className="update-service-title">Update Services page</h1>
      <form className="update-service-form" onSubmit={handleSubmit}>
        {/* Service dropdown */}
        <div className="form-group">
          <label htmlFor="service">Select Service:</label>
          <select id="service" className="form-control" onChange={handleServiceChange} value={selectedService}>
            <option value="">Select</option>
            {services.map((service) => (
              <option key={service.service_costid} value={service.service_costid}>
                {service.service_id.name}
              </option>
            ))}
          </select>
        </div>

        {/* Old Cost display */}{
          console.log('from old cost'+oldCost)
        }
        {selectedService && (
          <div className="form-group">
            <label>Old Cost:</label>
            <span className="old-cost">{oldCost}</span>
          </div>
        )}

        {/* New Cost input */}
        <div className="form-group">
          <label htmlFor="newCost">Enter New Cost:</label>
          <input type="number" id="newCost" className="form-control" onChange={handleNewCostChange} value={newCost} />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">Update Cost</button>
      </form>
    </div>
  );
};

export default UpdateService;
