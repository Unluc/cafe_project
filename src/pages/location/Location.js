import React, { useEffect } from "react";
import axios from "axios";
// import Footer from "../../components/footer/Footer.js";
import "./Location.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



export default function Location() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    // const [apiData, setApiData] = React.useState("");
    const [apiDGoogleMap, setApiGoogleMap] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/org/1/`, {responseType: "json"}).then((res) => {
            // console.log(res.data);
            setState("Success");
            // setApiData(res.data);
            setApiGoogleMap(res.data.google_link.match(/"([^"]*)"/));

          }).catch((err) => {
            // console.log(err);
          });
    }, []);
    
    // console.log(products);
    // console.log(typeof apiData);
    // console.log("apiData");
    return(
        <div className="menu ">
            {state === "Loading" ? (<h1>Loading</h1>) : (
                <div className="container-imap">
                    <iframe 
                        className="imap"
                        title="google-map"
                        src={apiDGoogleMap[1]}
                        // width="100%" 
                        // height="100%" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            )}
        </div>
        
    );
    
}
