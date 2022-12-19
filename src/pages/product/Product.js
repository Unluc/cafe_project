import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js"
import { useParams } from "react-router-dom";

function Product() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");

    // const { slug } = this.props.match.params;
    let slug = useParams().slug;
    // console.log(useParams());
    // console.log(slug);

    useEffect(() => {
        setState("Loading");
        axios.get(`http://localhost:8000/api/v1/product/${slug}/`, {responseType: "json"}).then((res) => {
            console.log(res.data);
            setState("Success");
            setApiData(res.data);

          }).catch((err) => {
            console.log(err);
          });
    }, []);
    // console.log(apiData)
    return(
        <div className="product-containce height">
            <div className="content-section">
                {state === "Loading" ? (<h1>Loading</h1>) : (
                    <div className="image-description">
                        <img src={apiData.preview === null ? "/default-food-image.jpg" : apiData.preview} alt={apiData.img_alt} />
                        <h2>Food name: {apiData.name}</h2>
                        <h2>Price: £{apiData.price}</h2>
                        <p>Description <br></br> {apiData.overview}</p>
                    </div>
                        // <div className="related-products">
                        //     <img />
                        //     <p>sdfsdf</p>
                        // </div>
                )}
                
            </div>

            <Footer />
        </div>
        
    );
}

export default Product;