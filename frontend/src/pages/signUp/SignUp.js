import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"

// import env from "react-dotenv"

const SignUp = (props) => {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const navigate = useNavigate();
      
    const[formStatus, setFormStatus] = React.useState("Register");
    const[validated, setValidated] = React.useState(false);
    const[email, setEmail] = React.useState("");
    const[emailError, setEmailError] = React.useState("");
    const[password, setPassword] = React.useState("");
    const[passwordError, setPasswordError] = React.useState("");
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    let conFom = {
      email: "",
      password: ""

    }

    useEffect(() => {
      if(email.match(validEmailRegex) && password.length > 7) {
        // console.log(`Email is ${email}`)
        setValidated(true);
        // console.log(validated)
      } else {
        setValidated(false)
      }
      // if(emailError[0]) {
      //   console.log(emailError[0].message);
      // }
      // if(passwordError[0]) {
      //   console.log(passwordError[0].message);
      // }
    }, [email, validEmailRegex, password.length, validated, emailError, passwordError])
    
    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
      const { email, password } = e.target.elements;
      // let input_errors = [];
      
      
      // if((email.value).match(validEmailRegex)) {
      //   email: email.value,
      // }

      conFom = {
          email: email.value,
          password: password.value,
      }
      
      // console.log(conFom);
      axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_REGISTER_URL}`, {
        "email": conFom.email,
        "password": conFom.password
      }, {
        "headers": {
          'Content-Type': 'application/json',
        }
    }).then((res) => {
        // console.log(res);
        localStorage.setItem("not-verified-user", JSON.stringify(res.data));
        navigate("/email-verification");
        setFormStatus("Submited");
        // console.log(isShowLogin);
        // isShowLogin = "true";
        // console.log(isShowLogin);
      }).catch((err) => {
        // console.log(err);
        
        // console.log(err.response.data.errors[0].state["email"]);
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
        // console.log(emailError);

        
        
      });
    }
    return (
        <div className="page-content height">
            <section className="content-section height">
                <div className="contact-form">
                    <form onSubmit={onSubmit} >
                        <h1>Sign Up</h1>
                        <label htmlFor="email">Email</label>
                        <br></br>
                        <input type="text" name="email" id="email" aria-describedby="email-error" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <span id="email-error" style={{color:"red"}}>{emailError[0] ? emailError[0].message : ""}</span>
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input type="password" name="password" id="password" aria-describedby="pass-error" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span id="pass-error" style={{color:"red"}}>{passwordError[0] ? passwordError[0].message : ""}</span>
                        <br></br>
                        <button disabled={!validated} className={validated? "btn-submit" : "disabled-btn"} type="submit" value="REGISTER">
                        {/* <button className={"btn-submit"} type="submit" value="REGISTER"> */}
                            {formStatus}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
  };

  export default SignUp;