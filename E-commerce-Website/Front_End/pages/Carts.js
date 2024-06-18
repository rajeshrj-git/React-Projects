import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carts() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
    };

    const handleIncreaseQuantity = (id) => {
        increaseQuantity(id);
    };

    const handleDecreaseQuantity = (id) => {
        decreaseQuantity(id);
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'inherit',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0.25rem 0.5rem',
        margin: '0 0.2rem'
    };

    const quantityControlsStyle = {
        display: 'flex',
        alignItems: 'center'
    };

    const quantityStyle = {
        fontSize: '1rem',
        margin: '0 0.5rem'
    };

    const placeOrderButtonStyle = {
        backgroundColor: 'darkorange',
        border: 'none',
        color: 'white',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '1rem',
        width: '100%'
    };

    const handlePlaceOrder = (item) => {
        navigate('/loginpage', { state: { item } });
    };

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                <>
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src={item.perfumeimage} className="card-img-top" alt={`${item.perfume_name}`} style={{ height: "250px", objectFit: "cover" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.perfume_name}</h5>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p className="card-text mb-0">Price: ${item.perfume_price}</p>
                                            <div style={quantityControlsStyle}>
                                                <button onClick={() => handleDecreaseQuantity(item.id)} style={buttonStyle}>-</button>
                                                <span style={quantityStyle}>{item.quantity}</span>
                                                <button onClick={() => handleIncreaseQuantity(item.id)} style={buttonStyle}>+</button>
                                            </div>
                                        </div>
                                        <p className="card-text">Color: {item.perfume_colour}</p>
                                        <button onClick={() => handleRemoveFromCart(item.id)} className="btn btn-danger">Remove</button>
                                        <button style={placeOrderButtonStyle} onClick={() => handlePlaceOrder(item)}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/" className="btn btn-primary me-2">Continue Shopping</Link>
                </>
            )}
        </div>
    );
}

export default Carts;
