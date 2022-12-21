import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js"
import { useParams } from "react-router-dom";

function GalleryDetail() {
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
        axios.get(`http://localhost:8000/api/v1/gallery/${slug}/`, {responseType: "json"}).then((res) => {
            console.log(res.data.image_set);
            setState("Success");
            setApiData(res.data.image_set);

          }).catch((err) => {
            console.log(err);
          });
    }, []);

    // console.log(apiData)
    return(
        <div className="product-containce height">
            <div className="content-section">
                {state === "Loading" ? (<h1>Loading</h1>) : (
                    Array.prototype.map.call(apiData, (gallery) => (
                            <img src={gallery.image === null ? "/default-food-image.jpg" : gallery.image} alt={gallery.alt} />
                    ))
                )}
                
            </div>

            <Footer />
        </div>
        
    );
}

export default GalleryDetail;