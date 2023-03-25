import React from "react";
import axios from "axios";
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
    // console.log(user);
    // console.log(user.id);
    // console.log(conFom);
    axios.post(`/api/v1/accounts/confirm_email/${user.id}`, {
      "code": conFom.code,
      // "email": conFom.email,
      // "message": conFom.message
    }, {
      "headers": {
        'Content-Type': 'application/json',
      }
  }).then((res) => {
      // console.log(res);
      localStorage.removeItem("not-verified-user");
      navigate("/login");
      setFormStatus("Submited");
    }).catch((err) => {
      // console.log(err);
    });
  }

  return (
    <div className="page-content height">
      <section className="content-section height">
        <div className="contact-form">
          <h2>Input your verification code</h2>

          <p>
            Your account was created. Use the form bellow to input code from your email to verificate email address. 
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
    </div>
    
  );
}

export default EmailVerification;

// todo: Make errors for code