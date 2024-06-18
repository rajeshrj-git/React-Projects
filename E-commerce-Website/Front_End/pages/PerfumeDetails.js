import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function PerfumeDetails() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/perfume/${id}`)
      .then(response => {
        setPerfume(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(perfume);
    navigate('/carts');
  };
  
  const handleBackToCart = () => {
    addToCart(perfume);
    navigate('/home');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!perfume) {
    return <div>No perfume found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={perfume.perfumeimage} className="img-fluid" alt={perfume.perfume_name} style={{ objectFit: "cover", width: "65%", height: "65%" }} />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h2 className="card-title">{perfume.perfume_name}</h2>
            <p className="card-text"><strong>Price:</strong> ${perfume.perfume_price}</p>
            <p className="card-text"><strong>Color:</strong> {perfume.perfume_colour}</p>
            <p className="card-text"><strong>Description:</strong> This luxurious scent captures the essence of adventure and risk-taking, making it perfect for those who crave excitement. With its 100ml size, it's a must-have for any thrill-seeker.</p>
            {/* <Link to="/home" className="btn btn-warning me-2 mb-3">Back</Link> */}
            <button 
              onClick={handleBackToCart} 
              className="btn btn me-2 mb-3" 
              style={{ backgroundColor: 'blue', color: 'white' }}
            >
              Continue Shopping
            </button>
            <button 
              onClick={handleAddToCart} 
              className="btn me-2 mb-3" 
              style={{ backgroundColor: 'darkorange', color: 'white' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetails;
