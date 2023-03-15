import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmailResetRequest() {
    
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
  const navigate = useNavigate();
  const[formStatus, setFormStatus] = React.useState("Input email");

  const[emailError, setEmailError] = React.useState("");

  React.useEffect(() => {
    if(emailError[0]) {
      console.log(emailError[0].message);
    }
  }, [emailError])
  
  const onSubmit = (e) => {

    

    e.preventDefault();
    setFormStatus("Submiting...");
    const { email } = e.target.elements;
    
    let conFom = {
        email: email.value,
        // email: email.value,
        // message: message.value,
    }

    // let user = JSON.parse(localStorage.getItem("not-verified-user"));
    // console.log(user);
    // console.log(user.id);
    // console.log(conFom);
    axios.post("/api/v1/accounts/request_for_email_reset/", {
      "email": conFom.email,
      // "email": conFom.email,
      // "message": conFom.message
    }, {
      "headers": {
        'Content-Type': 'application/json',
      }
  }).then((res) => {
      console.log(res);
    //   localStorage.removeItem("not-verified-user");
    //   navigate("/login");
      setFormStatus("Submited");
    }).catch((err) => {
      console.log(err);

      setFormStatus("Try again");
      if(err.response.data.errors[0].state["email"]) {
        setEmailError(err.response.data.errors[0].state["email"]) 
      } else {
        setEmailError("");
      }
    //   if(err.response.data.errors[0].state["password"]) {
    //     setPasswordError(err.response.data.errors[0].state["password"]) 
    //   } else {
    //     setPasswordError("");
    //   }
      console.log(emailError);
    });
  }


  // let isrc = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8815.741191091316!2d-2.9592313734848577!3d56.468875693506874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48865cdd3d79436b%3A0x31f82b065ba75b08!2sTesco%20Express!5e0!3m2!1sen!2suk!4v1673012640565!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  // let mass = isrc.match(/"([^"]*)"/);
  // console.log(mass);
  // console.log(mass[0]);

  return (
    <div className="page-content">
      <section className="content-section">
        <div className="contact-form">
          <h2>Input your email to change your current email</h2>

          

          <form onSubmit={onSubmit}>
          <p>
            If you want to change email use the form bellow to input your current email. You will get an email with link for changing email. 
          </p>
          <br></br>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
            <label style={{color:"red"}}>{emailError[0] ? emailError[0].message : ""}</label>

            <button className="btn-submit" type="submit" value="Input email">
              {formStatus}
            </button>
          </form>
        </div>
        
      </section>
    </div>
    
  );
}

// PasswordResetRequest;