import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer.js";
import "./AboutUs.css";

function AboutUs() {
    return(
        <div className="about-us-container height">
            <section className="hero-abt-us">
                <div className="hero-text">
                    <h1 className="hero-title">About Us</h1>

                    <p className="hero-subtitle">
                        
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi libero sed sequi deleniti aspernatur minus tempora nobis provident ipsa quae ratione repellendus reprehenderit beatae repudiandae ducimus explicabo nemo, eius sit.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi libero sed sequi deleniti aspernatur minus tempora nobis provident ipsa quae ratione repellendus reprehenderit beatae repudiandae ducimus explicabo nemo, eius sit.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi libero sed sequi deleniti aspernatur minus tempora nobis provident ipsa quae ratione repellendus reprehenderit beatae repudiandae ducimus explicabo nemo, eius sit.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi libero sed sequi deleniti aspernatur minus tempora nobis provident ipsa quae ratione repellendus reprehenderit beatae repudiandae ducimus explicabo nemo, eius sit.
                    </p>
                </div>

                <Link to="/menu" className="btn-primary">See our menu</Link>
            </section>

            <Footer />
        </div>
    );
}

export default AboutUs;