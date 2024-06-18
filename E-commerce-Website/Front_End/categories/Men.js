import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { CartContext } from '../pages/CartContext';

function Men() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:5000/perfumes', {
            params: {
                perfume_categories: 'men'
            }
        })
            .then(response => {
                setPerfumes(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Filter perfumes with category 'men'
    const menPerfumes = perfumes.filter(perfume => perfume.perfume_categories === 'men');

    return (
        <div className="container mt-5">
            <h2>Men's collections</h2>
            <div className="container mt-5">
                <div className="row">
                    {menPerfumes.map(perfume => (
                        <div className="col-md-6 mb-4" key={perfume.id}>
                            <img src={perfume.perfumeimage} className="img-fluid" alt={perfume.perfume_name} style={{ objectFit: "cover", width: "70%", height: "40%" }} />
                            <div className="card-body text-left" style={{ objectFit: "cover", width: "70%", height: "50%" }}>
                                <h2 className="card-title">
                                    <Link to={`/perfume/${perfume.id}`} className="text-decoration-none">{perfume.perfume_name}</Link>
                                </h2>
                                <p className="card-text"><strong>Price:</strong> ${perfume.perfume_price}</p>
                                <p className="card-text"><strong>Color:</strong> {perfume.perfume_colour}</p>
                                <p className="card-text"><strong>Description:</strong> This luxurious scent captures the essence of adventure and risk-taking, making it perfect for those who crave excitement. With its 100ml size, it's a must-have for any thrill-seeker.</p>
                                <button 
                                    onClick={() => addToCart(perfume)} 
                                    className="btn" 
                                    style={{ backgroundColor: 'darkorange', color: 'white' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div text-center>
                    <Link to="/home" className='btn btn-warning'> Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Men;
