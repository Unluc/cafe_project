// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { redirect, useParams } from "react-router-dom";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../contact-us/ContactUs.css";

const Login = (props) => {

    const navigate = useNavigate();

    // let forceRerender = useParams().rerenderParentCallback;

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    const[formStatus, setFormStatus] = React.useState("Login");
    const [user, setUser] = useState();
    
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
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        // rerenderParentCallback();
        props.forceUpdate(true);
        navigate("/");
    
        // console.log("res data after locac storage");
        // console.log(res.data);
        // console.log("Now I`ll show you user data from storage");
        // // console.log(localStorage.getItem("user"));
        // console.log(JSON.parse(localStorage.getItem("user")));


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
    //   <div className={`show`}>
    //     <div className="login-form">
    //       <div className="form-box solid">
    <div className="page-content height">
      <section className="content-section height">
        <div className="contact-form">
            <form onSubmit={onSubmit}>
              <h1 >Login</h1>
              <label htmlFor="email">Email</label>
              <br></br>
              <input type="text" name="email" htmlFor="email" />
              <br></br>
              <label>Password</label>
              <br></br>
              <input type="password" name="password" htmlFor="email" />
              <br></br>
              <button className="btn-submit" type="submit" value="LOGIN">
                {formStatus}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  };

  export default Login;