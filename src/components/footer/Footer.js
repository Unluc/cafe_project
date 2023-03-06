import "./Footer.css";
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Footer() {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    // const [apiDGoogleMap, setApiGoogleMap] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`/api/v1/org/1/`, {responseType: "json"}).then((res) => {
            console.log(res.data);
            setState("Success");
            setApiData(res.data);
            // setApiGoogleMap(res.data.google_link.match(/"([^"]*)"/));

          }).catch((err) => {
            console.log(err);
          });
    }, []);
    return(
        <>
        <div className="phantom"></div>
        <footer className="page-footer">
            {state === "Loading" ? (<h1>Loading</h1>) : (
            <>
            <h2>Disclaimer!!! I made this site for learning purpose and all data used not for commercial purposes.</h2>
            <div className="footer-content">
                
                <a href="#top">Back to Top</a>

                
                <ul className="footer-links">
                    <li>Location:</li>
                    <li>Country: {apiData.country}</li>
                    <li>City: {apiData.city}</li>
                    <li>Post code: {apiData.post_index}</li>
                    <li>Address: {apiData.address}</li>
                </ul>
                
                <p>Coffee Shop &copy;2022</p>

                <ul className="footer-links">
                    <li><Link to="#">Privacy Policy</Link></li>
                    <li><Link to="#">Terms and conditions</Link></li>
                </ul>
                {/* <div className="contact-links"> */}
                <div class="social-container">{
                    apiData.socialmedia_set === undefined ? (console.log("Loading or there are not social media links")) : 
                        Array.prototype.map.call(apiData.socialmedia_set, (social) => (
                        <a className="social" href={social.social_media_url} target="_blank" rel="noreferrer">
                            <img className="social-media-links" src={social.social_media_picture} alt={social.social_media_alt} />
                        </a>
                    ))}
                </div>
                <div class="social-container">Our emails: {
                    apiData.email_set === undefined ? (console.log("Loading or there are not social media links")) : 
                        Array.prototype.map.call(apiData.email_set, (email) => (
                        <>
                    <a href={`mailto:${email.email_address}`}>{email.email_address}</a>
                    <pre></pre>
                    </>
                    ))}
                </div>

                <div class="social-container">Our phone numbers: {
                    apiData.phone_set === undefined ? (console.log("Loading or there are not social media links")) : 
                        Array.prototype.map.call(apiData.phone_set, (phone) => (
                        <>
                    <a href={`tel:${phone.phone_number}`}>{phone.phone_number}</a>
                    <pre></pre>
                    </>
                    ))}
                </div>
            {/* </div> */}
            </div>
           
            
            
            </>
            )}
        </footer>
        </>
    );
}

export default Footer;

// window.onload = () => {
//     this.addEventListener("mousemove", (e) => {
//       var y = e.pageY;
//       let foot = document.querySelector(".page-footer");
//       (y >= window.innerHeight - 75) ? foot.style.bottom = "0px" : foot.style.bottom = "75px";
//       console.log("Its working");
//     })
//   }