// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useState } from "react";
import "./SignUp.css"

const SignUp = (props) => {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    const[formStatus, setFormStatus] = React.useState("Register");
    const[validated, setValidated] = React.useState(false);
    const[email, setEmail] = React.useState("");
    const[password, setPassword] = React.useState("");
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    let conFom = {
      email: "",
      password: ""

    }
    
    const onChange = (e) => {
      // let conFom = {
      //   email: email.value.match(validEmailRegex) ? email.value : "",
      //   password: password.value,
      // }
      e.preventDefault();
      // setFormStatus("Submiting...");
      // const { email, password } = e.target.elements;
      // console.log(e.target.text)
      
      // if(e.target.name === "email") {
      //   conFom.email = e.target.value
      // } else {
      //   conFom.password = e.target.value
      // }

      if(e.target.name === "email") {
        setEmail(e.target.value)
      } else {
        setPassword(e.target.value)
      }
      // conFom = {
      //   email: email.value,
      //   password: password.value,
      // }
      console.log("checking email")
      // console.log(conFom.email)
      // if(conFom.password) console.log(conFom.password)
      // if(conFom.email.match(validEmailRegex) && conFom.password.length > 7) {
      //   console.log(`Email is ${conFom.email}`)
      //   setValidated(true);
      // } else {
      //   setValidated(false)
      // }

      console.log(email)
      console.log(password)
      if(email.match(validEmailRegex) && password.length > 7) {
        console.log(`Email is ${email}`)
        setValidated(true);
      } else {
        setValidated(false)
      }
    }

    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
      // const { email, password } = e.target.elements;
      // let input_errors = [];
      
      
      // if((email.value).match(validEmailRegex)) {
      //   email: email.value,
      // }

      // conFom = {
      //     email: email.value,
      //     password: password.value,
      // }
      
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
        <div className="page-content height">
            <section className="content-section height">
                <div className="contact-form">
                    <form onSubmit={onSubmit} onChange={onChange}>
                        <h1>Sign Up</h1>
                        <label>Email</label>
                        <br></br>
                        <input type="text" name="email" htmlFor="email" value={email}/>
                        <br></br>
                        <label>Password</label>
                        <br></br>
                        <input type="password" name="password" htmlFor="email" value={password}/>
                        <br></br>
                        <button disabled={!validated} className={validated? "btn-submit" : "disabled-btn"} type="submit" value="REGISTER">
                            {formStatus}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
  };

  export default SignUp;