import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import CartContext

function Search() {
  const { perfume_name } = useParams();
  const [perfume, setPerfume] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext

  useEffect(() => {
    axios.get(`http://localhost:5000/search`, { params: { perfume_name } })
      .then(response => {
        setPerfume(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [perfume_name]);

  const handleAddToCart = (selectedPerfume) => {
    addToCart(selectedPerfume); // Add selected perfume to cart
    // Optionally, you can add a message or notification to confirm that the item has been added to the cart
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (perfume.length === 0) {
    return <div>No perfume found</div>;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {perfume.map(item => (
            <div className="col-md-6" key={item.id}>
              <img src={item.perfumeimage} className="img-fluid" alt={item.perfume_name} style={{ objectFit: "cover", width: "60%", height: "60%" }} />
              <div className="card-body">
                <h2 className="card-title">
                  <Link to={`/perfume/${item.id}`} className="text-decoration-none">{item.perfume_name}</Link> {/* Link to individual perfume page */}
                </h2>
                <p className="card-text"><strong>Price:</strong> ${item.perfume_price}</p>
                <p className="card-text"><strong>Color:</strong> {item.perfume_colour}</p>
                <p className="card-text"><strong>Description:</strong> This luxurious scent captures the essence of adventure and risk-taking, making it perfect for those who crave excitement. With its 100ml size, it's a must-have for any thrill-seeker.</p>
                <button 
                  onClick={() => handleAddToCart(item)} 
                  className="btn btn-primary" 
                  style={{ backgroundColor: 'darkorange', color: 'white' }} // Custom style for dark orange button
                >
                  Add to Cart
                </button> {/* Add to Cart button */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center"> {/* Center the Back button */}
        <Link to="/home" className="btn btn-warning mt-4 me-2">Back</Link>
      </div>
    </div>
  );
}

export default Search;
