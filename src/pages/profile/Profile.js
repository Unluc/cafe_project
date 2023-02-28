import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";
import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Profile = () => {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
    
  const[formStatus, setFormStatus] = React.useState("Update profile");
  const [apiData, setApiData] = React.useState("");
  let apiDataCopy = [];
  const [state, setState] = React.useState("");
  const onSubmit = (e) => {

    e.preventDefault();
    setFormStatus("Submiting...");
    const { first_name, last_name, phone_number } = e.target.elements;
    
    let conFom = {
      first_name: first_name.value,
      last_name: last_name.value,
      // email: email.value,
      phone_number: phone_number.value,
    }
    console.log(conFom);
    axios.put("/api/v1/accounts/profile/", {
      "first_name": conFom.first_name,
      "last_name": conFom.last_name,
      // "email": conFom.email,
      "phone_number": conFom.phone_number
    }, {
      "headers": {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
  }).then((res) => {
      console.log(res);
      setFormStatus("Submited");
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    setState("Loading");
    axios.get(`/api/v1/accounts/profile/`, {"headers": {
      "Access-Control-Allow-Origin": "*",
      
      'Content-Type': 'application/json',}}).then((res) => {
        setState("Success");
        
        setApiData(res.data);
        apiDataCopy = res.data;
      }).catch((err) => {
        console.log(err);
      });
}, []);

  return (
    <div className="page-content height">
      {
      localStorage.getItem("user") ?
        <section className="content-section height">
          <div className="contact-form">
            <h2>Profile</h2>

            <p>
              Use the form bellow to change your profile data.
            </p>

            <form onSubmit={onSubmit}>
              <label htmlFor="name">First name</label>
              <input type="text" id="first_name" value={apiData.first_name} onChange={(e) => setApiData(apiDataCopy.first_name = e.target.value)} required />

              <label htmlFor="name">Last name</label>
              <input type="text" id="last_name" value={apiData.last_name} onChange={(e) => setApiData(apiDataCopy.last_name = e.target.value)} required />

              {/* <label htmlFor="email">Email</label>
              <input type="email" id="email" value={apiData.email} onChange={(e) => setApiData(apiDataCopy.email = e.target.value)} required /> */}

              <label htmlFor="message">Phone number</label>
              <input type="name" id="phone_number" value={apiData.phone_number} onChange={(e) => setApiData(apiDataCopy.phone_number = e.target.value)} required />

              <button className="btn-submit" type="submit" value="Update profile">
                {formStatus}
              </button>
            </form>
          </div>
          
        <Link to="/change-password">Change password</Link>
        </section>
      : <p>To see this page you have to <Link to="/login">Login</Link></p>
      }
      
      <Footer />
    </div>
    
  );
}

export default Profile;