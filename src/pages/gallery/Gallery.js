import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Gallery() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/gallery/all_gallery/`, {responseType: "json"}).then((res) => {
            // console.log(res.data);
            setState("Success");
            setApiData(res.data);

          }).catch((err) => {
            // console.log(err);
          });
    }, []);

    return(
        <div className="pics-container">
            <div className="content-section height">
                <h2>All events</h2>
                <div className="products-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (gallery) => (
                            
                            <Link to={gallery.slug + "/"} className="product" params={{slug: gallery.slug}} key={gallery.id}>
                                <img src={gallery.preview === null ? "/default-food-image.jpg" : gallery.preview} alt={gallery.alt} />
                                <p className="gallery-title">{gallery.title}</p>
                            </Link>
                        
                        ))
                    )}
                </div> 
            </div>
                            
            {/* <Footer /> */}
        </div>
    );
}

export default Gallery;