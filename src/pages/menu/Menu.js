import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";
import "./Menu.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { addAbortSignal } from "form-data";



function Menu() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/product/all_products/`, {responseType: "json"}).then((res) => {
            console.log(res.data);
            setState("Success");
            setApiData(res.data);

          }).catch((err) => {
            console.log(err);
          });
    }, []);
    
    // console.log(products);
    // console.log(typeof apiData);
    // console.log("apiData");
    return(
        <div class="menu">
            <div className="content-section">
                <h2>All products</h2>
                <div className="products-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (product) => (
                            
                            <Link to={"product/" + product.slug + "/"} className="product" params={{slug: product.slug}}>
                                <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                                <p className="product-title">{product.name} £{product.price}</p>
                            </Link>
                        
                        ))
                    )}
                </div> 
            </div>
                            
            <Footer />
        </div>
        
    );
    
}

export default Menu;