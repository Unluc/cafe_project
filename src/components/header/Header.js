import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";


function Header() {
    const NAV_BUTTON = document.querySelector("#nav-btn");
    const NAV_LIST = document.querySelector("#nav-list");

    // Show/hide navigation on mobile if button is clicked
    NAV_BUTTON.onclick = () => {
        NAV_LIST.classList.toggle("show-navigation");
    }

    // Hide the navigation if a link is clicked
    NAV_LIST.onclick = () => {
    if (NAV_LIST.classList.contains("show-navigation")) {
        NAV_LIST.classList.remove("show-navigation");
    }
    }
    return (
        <header className="Page-header">
            <a href="index.html" className="Page-logo">
                <img className="Logo-img" src="logo2.jpg" alt="Logo" />
            </a>

            <a href="javascript:;" className="mobile-btn" id="nav-btn">
                &times;
                {/* <img src="images/nav-button.png" alt="Mobile navigation reveal button" /> */}
            </a>
       
            <nav className="Page-navigation" id="nav-list">
                <ul className="Navigation-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about-us">About us</Link>
                    </li>
                    <li>
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