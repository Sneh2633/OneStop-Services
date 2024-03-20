import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UpdateService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [newCost, setNewCost] = useState('');

  const user = useSelector((state) => state.logged.user);
  const vendorId = user.user_id;

  useEffect(() => {
    fetch(`http://localhost:8080/serviceCost/${vendorId}`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, [vendorId]);

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    setSelectedService(serviceId);
  };

  const handleNewCostChange = (event) => {
    setNewCost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedService) {
      console.error('Please select a service.');
      return;
    }

    const updateData = {
      serviceCostId: parseInt(selectedService),
      cost: parseFloat(newCost),
    };

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
        } else {
          console.error('Failed to update cost. Status:', response.status);
        }
      })
      .catch((error) => console.error('Error updating cost:', error));
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center">
      <div className="col-md-5">
        <h1 className="mb-4">Update Cost For Services</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="service" className="mb-2">Select Service:</label>
            <select id="service" className="form-control" onChange={handleServiceChange} value={selectedService}>
              <option value="">Select</option>
              {services.map((service) => (
                <option key={service.service_costid} value={service.service_costid}>
                  {service.service_id.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="newCost" className="mb-2">Enter New Cost:</label>
            <input type="number" id="newCost" className="form-control" onChange={handleNewCostChange} value={newCost} />
          </div>

          <button type="submit" className="btn btn-primary">Update Cost</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
