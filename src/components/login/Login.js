// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { redirect } from "react-router-dom";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isShowLogin }) => {

    const navigate = useNavigate();

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    const[formStatus, setFormStatus] = React.useState("Login");
    
    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
      const { email, password } = e.target.elements;
      
      let conFom = {
          email: email.value,
          password: password.value,
      }
      // console.log(conFom);
      axios.post("/api/v1/accounts/login/", {
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
        // <Navigate to="/menu" />
        // navigate("/menu");
      }).catch((err) => {
        console.log(err);
      });
    }
    return (
      <div className={`${isShowLogin ? "active" : ""} show`}>
        <div className="login-form">
          <div className="form-box solid">
            <form onSubmit={onSubmit}>
              <h1 className="login-text">Login</h1>
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

  export default LoginForm;