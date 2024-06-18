import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PerfumeDetails from "./pages/PerfumeDetails";
import Loginpage from "./pages/Loginpage";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Men from "./categories/Men";
import Women from "./categories/Women";
import AddCart from "./pages/Carts";
import { CartProvider } from "./pages/CartContext";
import AddressForm from "./pages/AddressForm"; 
import Orders from "./pages/Orders";
import './App.css';
import './index.css';

function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    return (
        <CartProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/perfume/:id" element={<PerfumeDetails />} />
                        <Route path="/search/:perfume_name" element={<Search />} />
                        <Route path="/loginpage" element={<Loginpage />} />
                        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
                        <Route path="/men" element={<Men />} />
                        <Route path="/women" element={<Women />} />
                        <Route path="/carts" element={<AddCart />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/addressform" element={<AddressForm />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
