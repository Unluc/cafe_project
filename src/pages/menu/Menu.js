import React, { useEffect } from "react";
import axios from "axios";
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
    return(
        <div className="content-section">
            <h2>All products</h2>

            {state === "Loading" ? (<h1>Loading</h1>) : (
                apiData.map(product => (
                    <div className="products-container">
                    <a href="images/polo-blue.jpg" className="product">
                        <img src={product.preview} alt={product.img_alt} />

                        <p className="product-title">{product.name} £{product.price}</p>
                    </a>
                </div>
                ))    
            )}
        </div>
    );
}

export default Menu;