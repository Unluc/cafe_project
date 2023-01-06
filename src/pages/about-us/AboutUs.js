import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer.js";
import "./AboutUs.css";

function AboutUs() {
    return(
        <div className="about-us-container">
            <div className="about-height">
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

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8814.398208418434!2d-2.9843797651312576!3d56.47465951736704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48865cd9442a00eb%3A0xe4c94fee7e6b284b!2sNational%20Tyres%20and%20Autocare%20-%20a%20Halfords%20company!5e0!3m2!1sen!2suk!4v1673010393460!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;