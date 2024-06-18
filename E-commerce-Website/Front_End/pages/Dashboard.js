import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        // Retrieve ordered items from local storage
        const storedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];
        setOrderedItems(storedItems);
    }, []);

    const removeItem = (index) => {
        const updatedItems = [...orderedItems];
        updatedItems.splice(index, 1);
        setOrderedItems(updatedItems);
        localStorage.setItem('orderedItems', JSON.stringify(updatedItems));
    };

    return (
        <div className="dashboard-container mt-5 mb-7">
            <h2 style={{ textAlign: 'center' }}>Your Orders</h2>
            {orderedItems.length > 0 ? (
                orderedItems.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    {item?.perfumeimage && (
                                        <img src={item.perfumeimage} className="img-fluid rounded-start" alt={`${item.perfume_name}`} />
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <h5 className="card-title">{item?.perfume_name}</h5>
                                    {item?.perfume_price && <p className="card-text">Price: ${item.perfume_price}</p>}
                                    {item?.quantity && <p className="card-text">Quantity: {item.quantity}</p>}
                                    {item?.perfume_colour && <p className="card-text">Color: {item.perfume_colour}</p>}
                                    <h6 className="card-subtitle mt-3">Address Details:</h6>
                                    <p className="card-text"><strong>Name:</strong> {item?.name}</p>
                                    <p className="card-text"><strong>Mobile Number:</strong> {item?.mobileNumber}</p>
                                    <p className="card-text"><strong>Address:</strong> {item?.address}</p>
                                </div>
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={() => removeItem(index)}>Cancel Order</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No items to display.</div>
            )}
        </div>
    );
};

export default Dashboard;
