import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js"
import { useParams } from "react-router-dom";
import "./GalleryDetail.css"

function GalleryDetail() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [apiDataObject, setApiDataObject] = React.useState("");
    const [state, setState] = React.useState("");

    // const { slug } = this.props.match.params;
    let slug = useParams().slug;
    // console.log(useParams());
    // console.log(slug);

    useEffect(() => {
        setState("Loading");
        axios.get(`http://localhost:8000/api/v1/gallery/${slug}/`, {responseType: "json"}).then((res) => {
            console.log(res.data.image_set);
            setState("Success");
            
            setApiData(res.data.image_set);
            setApiDataObject(res.data)
          }).catch((err) => {
            console.log(err);
          });
    }, []);

    
    return(
        <div className="product-containce height">
            <div className="content-section height">
                <h1>{apiDataObject.title}</h1>
                <div className="gallery-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (gallery) => (
                                <img className="gallery-card" src={gallery.image === null ? "/default-food-image.jpg" : gallery.image} alt={gallery.alt} />
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
        
    );
}

export default GalleryDetail;