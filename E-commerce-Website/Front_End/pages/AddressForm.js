import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddressForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.item;

    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine product details with address form data
        const orderData = {
            ...item,
            ...formData
        };

        // Get existing ordered items from local storage
        const existingOrders = JSON.parse(localStorage.getItem('orderedItems')) || [];

        // Add the new order data to the ordered items list
        const updatedOrders = [...existingOrders, orderData];

        // Store updated ordered items in local storage
        localStorage.setItem('orderedItems', JSON.stringify(updatedOrders));

        // Navigate to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className="container mt-5">
            <h5 className="mb-4">Address Form</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                    <input type="tel" className="form-control" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddressForm;
