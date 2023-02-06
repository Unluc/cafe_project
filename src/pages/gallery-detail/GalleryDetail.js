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





    // let images = document.getElementsByClassName("picture");
    let lightbox = document.getElementById("lightbox");
    // let lightboxImage = "";
    // let lightboxCaption = "";
    const [lightboxImage, setLightboxImage] = React.useState("");
    const [lightboxCaption, setLightboxCaption] = React.useState("");
    const [lightboxIndex, setLightboxIndex] = React.useState(0);
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
            setLightboxImage(image);
            setLightboxCaption(alt);
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
        lightboxIndex === apiData.length - 1 ? setLightboxIndex(0) : setLightboxIndex(lightboxIndex++);
        // lightboxImage.src = images[index].src;
        // lightboxCaption.innerText = images[index].alt;
        setLightboxImage(apiData[lightboxIndex].image);
        setLightboxCaption(apiData[lightboxIndex].alt);
      }
      function backward() {
        lightboxIndex === 0 ? lightboxIndex = apiData.length - 1 : lightboxIndex--;
        // lightboxImage.src = images[index].src;
        // lightboxCaption.innerText = images[index].alt;
        setLightboxImage(apiData[lightboxIndex].image);
        setLightboxCaption(apiData[lightboxIndex].alt);
      }
    
    return(
        <div className="product-containce height">
            <div className="content-section height">
                <h1>{apiDataObject.title}</h1>
                <div className="gallery-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (gallery) => (
                                <img className="gallery-card" onClick={() => lightboxDisplay(gallery, gallery.image, gallery.alt)} src={gallery.image === null ? "/default-food-image.jpg" : gallery.image} alt={gallery.alt} key={gallery.id}/>
                        ))
                    )}

                    <div className="lightbox" id="lightbox">
                        <span className="close" onClick={() => lightboxClose()}>&times;</span>
                        <figure>
                            <button class="lightbox-btn" onclick={() => backward()}>&#x2190</button>
                            <img id="lightbox-image" className="lightbox-image" src={lightboxImage} alt={lightboxCaption} />
                            <button class="lightbox-btn" onclick={() => forward()}>&#x2192</button>
                            <figcaption id="lightbox-caption">{lightboxCaption}</figcaption>
                        </figure>
                    </div>
                    
                </div>
            </div>

            <Footer />
        </div>
        
    );
}

export default GalleryDetail;