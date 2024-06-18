import React, { useState, useEffect, useContext } from "react";
import Slider from "../pages/Slider";
import axios from 'axios';
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; 

function Home() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:5000/perfumes')
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

    return (
        <div>
            <Slider />
            <div className="section">
                <div className="container mt-5 mb-5">
                    <div className="row">
                        {perfumes.map((perfume) => (    
                            <div className="col-md-4 mb-4" key={perfume.id}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src={perfume.perfumeimage} className="card-img-top" alt={`${perfume.perfume_name}`} style={{ height: "250px", objectFit: "cover" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link to={`/perfume/${perfume.id}`} className="text-decoration-none">{perfume.perfume_name}</Link>
                                        </h5>
                                        <p className="card-text">Price: ${perfume.perfume_price}</p>
                                        <p className="card-text">Color: {perfume.perfume_colour}</p>
                                        <button onClick={() => addToCart(perfume)} className="btn btn-orange me-2">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <h3 className="main-heading">Perfume Company</h3>
                            <div className="underline mx-auto"></div>
                            <p>Perfume is more than just a fragrance; it’s an invisible part of our personal style, a comforting presence in our daily lives, and a form of self-expression. In this updated article, we delve deeper into the world of perfume quotes, exploring their significance for various occasions and moods.</p>
                            <Link to="/about" className="btn btn-warning shadow">Read more</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
