import React from "react";
import axios from "axios";
import "./ContactUs.css"
import Footer from "../../components/footer/Footer.js";

const ContactForm = () => {
    
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


  // let isrc = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8815.741191091316!2d-2.9592313734848577!3d56.468875693506874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48865cdd3d79436b%3A0x31f82b065ba75b08!2sTesco%20Express!5e0!3m2!1sen!2suk!4v1673012640565!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  // let mass = isrc.match(/"([^"]*)"/);
  // console.log(mass);
  // console.log(mass[0]);

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

export default ContactForm;

/* <div className="container mt-5">
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
  </div> */