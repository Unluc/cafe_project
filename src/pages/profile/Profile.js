import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";

const Profile = () => {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
    
  const[formStatus, setFormStatus] = React.useState("Update profile");
  const [apiData, setApiData] = React.useState("");
  const [state, setState] = React.useState("");
  const onSubmit = (e) => {

    e.preventDefault();
    setFormStatus("Submiting...");
    const { first_name, last_name, email, phone_number } = e.target.elements;
    
    let conFom = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      // phone_number: phone_number.value,
    }
    console.log(conFom);
    axios.post("/api/v1/accounts/profile/", {
      "first_name": conFom.first_name,
      "last_name": conFom.last_name,
      "email": conFom.email,
      // "phone_number": conFom.phone_number
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
      }).catch((err) => {
        console.log(err);
      });
}, []);

  return (
    <div className="page-content height">
      <section className="content-section height">
        <div className="contact-form">
          <h2>Profile</h2>

          <p>
            Use the form bellow to change your profile data.
          </p>

          <form onSubmit={onSubmit}>
            <label htmlFor="name">First name</label>
            <input type="text" id="first_name" value={apiData.first_name} required />

            <label htmlFor="name">Last name</label>
            <input type="text" id="last_name"  required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={apiData.email} required />

            {/* <label htmlFor="message">Phone number</label>
            <input type="name" id="phone_number" value={apiData.phone_number} required /> */}

            <button className="btn-submit" type="submit" value="Update profile">
              {formStatus}
            </button>
          </form>
        </div>
        
      </section>
      <Footer />
    </div>
    
  );
}

export default Profile;