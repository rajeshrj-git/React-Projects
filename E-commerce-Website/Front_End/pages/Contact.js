import React from "react";
// import './Conatct.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Contact() {
    return (
        <footer className="bg-secondary text-white py-4 text-center mt-5">
            <div className="container">
                <h2>Contact Us</h2>
                <p>
                    You can reach us via email at <a href="mailto:info@example.com" className="text-warning">info@example.com</a>.
                </p>
                <p>
                    Alternatively, you can give us a call at <a href="tel:+1234567890" className="text-warning">+1 (234) 567-890</a>.
                </p>
                <p>
                    Our office address is:
                    <br />
                    123 Street Name,
                    <br />
                    City, State, Zip Code,
                    <br />
                    Country.
                </p>
                <div className="mt-4">
                    <Link to="/home" className="btn btn-warning me-2">Home</Link>
                    <Link to="/about" className="btn btn-warning">About</Link>
                </div>
            </div>
        </footer>
    );
}

export default Contact;
