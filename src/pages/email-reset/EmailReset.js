// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate, Link, redirect, useParams } from "react-router-dom";

import axios from "axios";
import React, { useState, useEffect } from "react";
// import {  } from "react-router-dom";
import "../contact-us/ContactUs.css";

export default function EnailReset() {

    // let forceRerender = useParams().rerenderParentCallback;

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const navigate = useNavigate();

    let slug = useParams().slug;
    let id = useParams().id;
      
    const[formStatus, setFormStatus] = React.useState("Reset Email");
    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
  
    const[validated, setValidated] = React.useState(false);
    // const[oldPassword, setOldPassword] = React.useState("");
    const[newEmail, setNewEmail] = React.useState("");
    // const[newPassword2, setNewPassword2] = React.useState("");
    // const[oldPasswordError, setOldPasswordError] = React.useState("");
    const[newEmailError, setNewEmailError] = React.useState("");
    // const[newPasswordError2, setNewPasswordError2] = React.useState("");


    let conFom = {
    //   oldPassword: "",
      newEmail: "",
    //   newPassword2: ""
    }

    useEffect(() => {
      if(newEmail.match(validEmailRegex)) {
        // console.log(`Email validated ${newEmail}`)
        setValidated(true);
        // console.log(validated)
      } else {
        setValidated(false)
      }
    //   if(oldPasswordError[0]) {
    //     console.log(oldPasswordError[0].message);
    //   }
      // if(newEmailError[0]) {
      //   console.log(newEmailError[0].message);
      // }
    //   if(newPasswordError2[0]) {
    //     console.log(newPasswordError2[0].message);
    //   }
    }, [newEmail, validEmailRegex, validated, newEmailError])
    
    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
    //   console.log(e.target.elements[3])
      const { newEmail } = e.target.elements;
      // let input_errors = [];
    //   console.log(newPassword2Value)
      
      // if((email.value).match(validEmailRegex)) {
      //   email: email.value,
      // }

      conFom = {
        // oldPassword: e.target.elements[0].value,
        newEmail: e.target.elements[0].value,
        // newPassword2: e.target.elements[1].value,
      }
      // console.log(conFom)
      
      // console.log(conFom);
      axios.post(`/api/v1/accounts/reset_email/${id}/${slug}`, {
        // "old_password": conFom.oldPassword,
        "new_email": conFom.newEmail,
        // "new_password2": conFom.newPassword2,
      }, {
        "headers": {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
        }
    }).then((res) => {
        // console.log(res);
        // let user = localStorage.getItem("user");
        // console.log(user["password"])
        // user["password"] = conFom.newPassword1
        // console.log(user);
        
        setFormStatus("Submited");
        // navigate("/profile");
        // isShowLogin = "true";
        // console.log(isShowLogin);
      }).catch((err) => {
        // console.log(err);
        
        // console.log(err.response.data.errors[0].state["email"]);
        // if(err.response.data.errors[0].state["old_password"]) {
        //   setOldPasswordError(err.response.data.errors[0].state["old_password"]) 
        // } else {
        //   setOldPasswordError("");
        // }
        // console.log(err.response.status)
        if(err.response.status === 500){
            setNewEmailError("Error")
            // console.log("It shoud work")
        } else {
            if(err.response.data.errors[0].state["new_email"]) {
                setNewEmailError(err.response.data.errors[0].state["new_email"]) 
              } else {
                setNewEmailError("");
              }
            //   if(err.response.data.errors[0].state["new_password2"]) {
            //     setNewPasswordError2(err.response.data.errors[0].state["new_password2"]) 
            //   } else {
            //     setNewPasswordError2("");
            //   }
        } 
        
        // console.log(emailError);

        
        
      });
    }
    return (
        <div className="page-content">
            <section className="content-section">
                <div className="contact-form">
                    <form onSubmit={onSubmit} >
                        <h1>Reset email</h1>
                        {/* <label>Old password</label>
                        <br></br>
                        <input type="text" name="old_password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                        <label style={{color:"red"}}>{oldPasswordError[0] ? oldPasswordError[0].message : ""}</label>
                        <br></br> */}
                        <label htmlFor="email">New email</label>
                        <br></br>
                        <input type="email" name="new_email" id="email" aria-describedby="email-error" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                        <span id="email-error" style={{color:"red"}}>{newEmailError[0] ? newEmailError[0].message : ""}</span>
                        {/* <br></br>
                        <label>New password</label>
                        <br></br>
                        <input type="password" name="new_password2" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)}/>
                        <label style={{color:"red"}}>{newPasswordError2[0] ? newPasswordError2[0].message : ""}</label> */}
                        <br></br>
                        <button disabled={!validated} className={validated? "btn-submit" : "disabled-btn"} type="submit" value="Reset Email" aria-describedby="submit">
                        {/* <button className={"btn-submit"} type="submit" value="REGISTER"> */}
                            {formStatus}
                        </button>
                        {formStatus === "Submited" ? <span id="submit" style={{color:"green"}}>Your submit was a success!!!</span> : ""}
                    </form>
                </div>
            </section>
        </div>
    );
  };