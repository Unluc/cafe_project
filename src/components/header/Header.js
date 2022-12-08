import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";


function Header() {
    return (
        <header className="Page-header">
            <a href="index.html" className="Page-logo">
            <img className="Logo-img" src="logo2.jpg" alt="Logo" />
            </a>
       
            <nav className="Page-navigation" id="nav-list">
            <ul className="Navigation-list">
                <li>
                {/* <a href="index.html">Home</a> */}
                <Link to="/">Home</Link>
                </li>
                <li>
                    {/* <a href="index.html">About us</a> */}
                    <Link to="/about-us">About us</Link>
                </li>
                <li>
                    {/* <a href="index.html">Menu</a> */}
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                <Link to="/contact-us">Contact Us</Link>
                </li>
            </ul>
            </nav>
        </header>
    );
}

export default Header();