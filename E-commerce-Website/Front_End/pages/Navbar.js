import React, { useState, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Access cartItems from CartContext

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleMenClick = () => {
    navigate('/men');
  };

  const handleWomenClick = () => {
    navigate('/women');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Perfumy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link btn btn-primary me-2">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link btn btn-primary me-2 dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button onClick={handleMenClick} className="dropdown-item">Men</button>
                </li>
                <li>
                  <button onClick={handleWomenClick} className="dropdown-item"> Women</button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link btn btn-primary me-2">About Us</Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "500px" }} // Increased width
            />
            <button className="btn btn-outline-success btn-sm" type="submit" style={{ fontSize: "14px" }}>Search</button> {/* Decreased font size */}
          </form>
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link to="/dashboard" className="nav-link btn btn-primary">Your Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/carts" className="nav-link btn btn-primary">🛒Carts ({cartItems.length})</Link> {/* Display cartItems length */}
            </li>
            <li className="nav-item">
              <Link to="/loginpage" className="nav-link btn btn-primary">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
