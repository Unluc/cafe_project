import React, { useEffect } from "react";
import axios from "axios";
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





    // let images = document.getElementsByClassName("picture");
    let lightbox = document.getElementById("lightbox");
    // let lightboxImage = "";
    // let lightboxCaption = "";
    // const [lightboxImage, setLightboxImage] = React.useState("");
    // const [lightboxCaption, setLightboxCaption] = React.useState("");
    const [lightboxIndex, setLightboxIndex] = React.useState(0);
    const [lightboxObj, setLightboxObj] = React.useState({});
    // let lightboxImage = document.getElementById("lightbox-image");
    // let lightboxCaption = document.getElementById("lightbox-caption");
    // let index = 0;



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

    function lightboxDisplay(obj, image, alt) {
        console.log(image);
        if(obj) {
            // setLightboxObject(obj);
            console.log(lightboxIndex);
            setLightboxIndex(apiData.indexOf(obj));
            console.log(lightboxIndex);
            // console.log(apiData);
            // console.log(obj);
            // console.log(apiData.indexOf(obj));
            setLightboxObj(obj);
            // setLightboxCaption(alt);
        }
        // if(image) 
        // if(alt) 
        if(document.getElementById("lightbox")) {
            lightbox.style.display = "block";
            console.log("lightbox should work");
            
        }
      }

    function lightboxClose() {
        if(document.getElementById("lightbox")) {
            lightbox.style.display = "none";
        }
      }

    function forward() {
        console.log(lightboxIndex);
        console.log("forward");
        console.log(apiData.length - 1);
        if (lightboxIndex === apiData.length - 1) {
            setLightboxIndex(0);
            setLightboxObj(apiData[0]);
            // setLightboxCaption(apiData[0].alt);
        } else {
            setLightboxIndex(lightboxIndex + 1);
            setLightboxObj(apiData[lightboxIndex + 1]);
            // setLightboxCaption(apiData[lightboxIndex + 1].alt);
        }
      }
      function backward() {
        console.log(lightboxIndex);
        console.log("backward");
        console.log(apiData.length - 1);
        if (lightboxIndex === 0) {
            setLightboxIndex(apiData.length - 1);
            setLightboxObj(apiData[apiData.length - 1]);
            // setLightboxCaption(apiData[apiData.length - 1].alt);
        } else {
            setLightboxIndex(lightboxIndex - 1);
            setLightboxObj(apiData[lightboxIndex - 1]);
            // setLightboxCaption(apiData[lightboxIndex - 1].alt);
        }
      }
    
    return(
        <div className="product-containce">
            <div className="content-section">
                <h1>{apiDataObject.title}</h1>
                <div className="gallery-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (gallery) => (
                                <img className="gallery-card" onClick={() => lightboxDisplay(gallery, gallery.image, gallery.alt)} src={gallery.image === null ? "/default-food-image.jpg" : gallery.image} alt={gallery.alt} key={gallery.id}/>
                        ))
                    )}

                    <div className="lightbox" id="lightbox">
                        <span className="close" onClick={() => lightboxClose()}>&times;</span>
                        <figure className="lightbox-figure">
                            <button class="lightbox-btn" onClick={() => backward()}>&#x2190;</button>
                            <img id="lightbox-image" className="lightbox-image" src={lightboxObj.image} alt={lightboxObj.alt} />
                            <button class="lightbox-btn" onClick={() => forward()}>&#x2192;</button>
                            <figcaption id="lightbox-caption">{lightboxObj.alt}</figcaption>
                        </figure>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default GalleryDetail;