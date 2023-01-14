import React from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";

const Profile = () => {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  const[formStatus, setFormStatus] = React.useState("Send Message");
  
  const onSubmit = (e) => {

    e.preventDefault();
    setFormStatus("Submiting...");
    const { name, email, message } = e.target.elements;
    
    let conFom = {
        name: name.value,
        email: email.value,
        message: message.value,
    }
    console.log(conFom);
    axios.post("/api/v1/contact_us/contact/", {
      "name": conFom.name,
      "email": conFom.email,
      "message": conFom.message
    }, {
      "headers": {
        'Content-Type': 'application/json',
      }
  }).then((res) => {
      console.log(res);
      setFormStatus("Submited");
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="page-content height">
      <section className="content-section height">
        <div className="contact-form">
          <h2>Get in Touch</h2>

          <p>
            Use the form bellow to send us feedback or ask us a question. 
          </p>

          <form onSubmit={onSubmit}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" required />

            <button className="btn-submit" type="submit" value="Send Message">
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