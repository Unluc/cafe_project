import React from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
  const navigate = useNavigate();
  const[formStatus, setFormStatus] = React.useState("Send Code");
  
  const onSubmit = (e) => {

    

    e.preventDefault();
    setFormStatus("Submiting...");
    const { code } = e.target.elements;
    
    let conFom = {
      code: code.value,
        // email: email.value,
        // message: message.value,
    }

    let user = JSON.parse(localStorage.getItem("not-verified-user"));
    console.log(user);
    console.log(user.id);
    console.log(conFom);
    axios.post(`/api/v1/accounts/confirm/${user.id}`, {
      "code": conFom.code,
      // "email": conFom.email,
      // "message": conFom.message
    }, {
      "headers": {
        'Content-Type': 'application/json',
      }
  }).then((res) => {
      console.log(res);
      localStorage.removeItem("not-verified-user");
      navigate("/login");
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
          <h2>Input your verification code</h2>

          <p>
            Use the form bellow to input code from your email to verificate email address. 
          </p>

          <form onSubmit={onSubmit}>

            <label htmlFor="code">Code</label>
            <input type="code" id="code" required />

            <button className="btn-submit" type="submit" value="Send code">
              {formStatus}
            </button>
          </form>
        </div>
        
      </section>
      <Footer />
    </div>
    
  );
}

export default EmailVerification;