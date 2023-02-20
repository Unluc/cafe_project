// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Link, redirect, useParams } from "react-router-dom";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../contact-us/ContactUs.css";
import Footer from "../../components/footer/Footer.js"

const Login = (props) => {

    const navigate = useNavigate();

    // let forceRerender = useParams().rerenderParentCallback;

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    const[formStatus, setFormStatus] = React.useState("Login");
    const [user, setUser] = useState();


    const[emailError, setEmailError] = React.useState("");
    const[passwordError, setPasswordError] = React.useState("");


    useEffect(() => {
      if(emailError[0]) {
        console.log(emailError[0].message);
      }
      if(passwordError[0]) {
        console.log(passwordError[0].message);
      }
    }, [emailError, passwordError])

    
    const onSubmit = (e) => {
  
      e.preventDefault();
      // setFormStatus("Submiting...");
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
        console.log(JSON.parse(localStorage.getItem("user")))
        // rerenderParentCallback();
        props.forceUpdate(!props.ignored);
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

        console.log(err.response.data.errors[0].state["email"]);
        if(err.response.data.errors[0].state["email"]) {
          setEmailError(err.response.data.errors[0].state["email"]) 
        } else {
          setEmailError("");
        }
        if(err.response.data.errors[0].state["password"]) {
          setPasswordError(err.response.data.errors[0].state["password"]) 
        } else {
          setPasswordError("");
        }
        console.log(emailError);
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
              <label style={{color:"red"}}>{emailError[0] ? emailError[0].message : ""}</label>
              <br></br>
              <label>Password</label>
              <br></br>
              <input type="password" name="password" htmlFor="email" />
              <label style={{color:"red"}}>{passwordError[0] ? passwordError[0].message : ""}</label>
              
              <p>No account? <Link to="/signup">Create one</Link></p>
              <br></br>
              
              <button className="btn-submit" type="submit" value="LOGIN">
                {formStatus}
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    );
  };

  export default Login;