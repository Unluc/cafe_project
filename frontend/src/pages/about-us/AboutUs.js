import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {
    return(
        <div className="about-us-container">
            <div className="about-height">
                <section className="hero-abt-us">
                    <div className="hero-text">
                        <h1 className="hero-title">About Us</h1>

                        <p className="hero-subtitle">
                        Our main goal since we began has remained basic: acquaint our clients with the domains we specifically purchase our extraordinary-tasting coffee from, broil the beans with consideration, 
                        and make astounding coffee increasingly available through our bistros and our site. The coffee we cook is the coffee we like to drink, and we trust you like it as well. 
                        </p>
                        <br></br>
                        <p>
                        The primary thing we did when we began our organization was to feature our honor-winning ranches.
                        </p>
                        <br></br>
                        <p>
                        This thought of straightforwardness naturally advanced to the manner in which we worked in different territories as well 
                        our baristas are constantly present to talk about blending tips, our client benefit group is there to walk you through your coffee questions, 
                        and our broiling group to demonstrate to you how they function.
                        </p>
                    </div>

                    <Link to="/menu" className="btn-primary">See our menu</Link>

                </section>
            </div>
        </div>
    );
}

export default AboutUs;