import React, { useEffect } from "react";
import axios from "axios";
import "./Product.css"
import { useParams, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import env from "react-dotenv"

export default function Product() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");
    const [apiRelatedProducts, setApiRelatedProducts] = React.useState("");

    let slug = useParams().slug;

    useEffect(() => {
        setState("Loading");
        axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PRODUCT_URL}${slug}/`, {responseType: "json"}).then((res) => {
            // console.log(res.data);
            setState("Success");
            setApiData(res.data);
            setApiRelatedProducts(res.data.related_products)
          }).catch((err) => {
            // console.log(err);
          });
    }, [slug]);

    return(
        <div className="product-containce">
            <div className="content-section">
                {state === "Loading" ? (<h1>Loading</h1>) : (
                    <div>
                        <div className="image-description">
                            <img src={apiData.preview === null ? "/default-food-image.jpg" : apiData.preview} alt={apiData.img_alt} />
                            <div className="product-description">
                                <h2>{apiData.name}</h2>
                                <p>Price: £{apiData.price}</p>
                                <p className="text-description">Description: <br></br> {apiData.overview}</p>
                            </div>                       
                        </div>
                        {apiRelatedProducts.length > 0 ? (
                        <div>
                            <h2 className="related-prod-title">Related Products</h2>
                            <div className="related-products">
                            {
                                Array.prototype.map.call(apiRelatedProducts, (product) => (
                                    // <Link to={`../${product.slug}/`} onClick={() => window.location.href=`../${product.slug}/`} className="product" params={{slug: product.slug}} relative="path">
                                    <Link to={`/menu/${product.slug}/`}  className="gallery-card" params={{slug: product.slug}} key={product.id}>
                                        <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                                        <p>{product.name} £{product.price}</p>
                                    </Link>
                                ))
                            }                     
                            </div>
                        </div>)
                        : ""}  
                    </div>
                )}
                
            </div>
        </div>
        
    );
}
