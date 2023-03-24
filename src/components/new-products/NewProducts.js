import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function NewProducts() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/product/new_products/`, {responseType: "json"}).then((res) => {
            console.log(res.data);
            setState("Success");
            setApiData(res.data);

          }).catch((err) => {
            console.log(err);
          });
    }, []);

    return(
        <section className="content-section">
        <h2>New Products</h2>

        <div className="products-container">
            {state === "Loading" ? (<h1>Loading</h1>) : (
                Array.prototype.map.call(apiData, (product) => (
                    
                    <Link to={"menu/" + product.slug + "/"} className="gallery-card" params={{slug: product.slug}} key={product.id}>
                        <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                        <p className="product-title">{product.name} £{product.price}</p>
                    </Link>
                
                ))
            )}
        </div>
        <br></br>
        <br></br>
        <Link to="/menu" className="btn-primary">Browse the Menu</Link>
      </section>
    );
}

export default NewProducts;