import React from "react";
import axios from "axios";

const ContactForm = () => {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  const[formStatus, setFormStatus] = React.useState("Send");
  
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
      <div className="container mt-5">
    <h2 className="mb-3">Contact us form</h2>
    <form class="contact-form" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input className="form-control" type="text" id="name" required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input className="form-control" type="email" id="email" required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea className="form-control" id="message" required />
      </div>
      <button className="btn btn-danger" type="submit">
        {formStatus}
      </button>
    </form>
  </div>
  )
}

export default ContactForm;