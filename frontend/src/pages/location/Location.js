import React, { useEffect } from "react";
import axios from "axios";
import "./Location.css";
// import env from "react-dotenv"



export default function Location() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    // const [apiData, setApiData] = React.useState("");
    const [apiDGoogleMap, setApiGoogleMap] = React.useState("");
    const [state, setState] = React.useState("");

    useEffect(() => {
        setState("Loading");
        axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_ORG_URL}`, {responseType: "json"}).then((res) => {
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
