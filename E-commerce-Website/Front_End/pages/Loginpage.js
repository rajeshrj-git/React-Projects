import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.item;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const url = isRegistering ? 'http://localhost:5000/register' : 'http://localhost:5000/login';

        try {
            const response = await axios.post(url, {
                email,
                password
            });

            setLoading(false);

            if (response.data.success) {
                console.log(isRegistering ? 'Registration successful' : 'Login successful');
                if (isRegistering) {
                    setIsRegistering(false);
                    setEmail('');
                    setPassword('');
                } else {
                    localStorage.setItem('isAuthenticated', 'true'); // Store auth state

                    // Get existing ordered items from local storage
                    const existingOrders = JSON.parse(localStorage.getItem('orderedItems')) || [];

                    // Add the new item to the ordered items list
                    const updatedOrders = [...existingOrders, item];

                    // Store updated ordered items in local storage
                    localStorage.setItem('orderedItems', JSON.stringify(updatedOrders));

                    // Navigate to the dashboard
                    navigate('/addressform');
                }
            } else {
                setError(response.data.message);
                console.log(isRegistering ? 'Registration failed: ' : 'Login failed: ', response.data.message);
            }
        } catch (error) {
            setLoading(false);
            setError('An error occurred. Please try again later.');
            console.error('Error during request: ', error);
        }
    };

    return (
        <div className="login-container mt-5 mb-7">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
                </button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-button mt-3">
                {isRegistering ? 'Already have an account? Login' : 'New user? Register here'}
            </button>
        </div>
    );
};

export default LoginPage;
