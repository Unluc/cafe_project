// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useState } from "react";

const SignUpForm = ({ isShowLogin }) => {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    const[formStatus, setFormStatus] = React.useState("Register");
    
    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
      const { email, password } = e.target.elements;
      
      let conFom = {
          email: email.value,
          password: password.value,
      }
      // console.log(conFom);
      axios.post("/api/v1/accounts/register/", {
        "email": conFom.email,
        "password": conFom.password
      }, {
        "headers": {
          'Content-Type': 'application/json',
        }
    }).then((res) => {
        console.log(res);
        setFormStatus("Submited");
        // console.log(isShowLogin);
        // isShowLogin = "true";
        // console.log(isShowLogin);
      }).catch((err) => {
        console.log(err);
      });
    }
    return (
      <div className={`${isShowLogin ? "active" : ""} show`}>
        <div className="login-form">
          <div className="form-box solid">
            <form onSubmit={onSubmit}>
              <h1 className="login-text">Sign Up</h1>
              <label>Email</label>
              <br></br>
              <input type="text" name="email" className="login-box" />
              <br></br>
              <label>Password</label>
              <br></br>
              <input type="password" name="password" className="login-box" />
              <br></br>
              <button className="login-btn" type="submit" value="LOGIN">
                {formStatus}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default SignUpForm;