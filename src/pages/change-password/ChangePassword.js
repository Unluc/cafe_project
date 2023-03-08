import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../signUp/SignUp.css"


const ChangePassword = () => {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const navigate = useNavigate();
      
    const[formStatus, setFormStatus] = React.useState("Change Password");
    const[validated, setValidated] = React.useState(false);
    const[oldPassword, setOldPassword] = React.useState("");
    const[newPassword1, setNewPassword1] = React.useState("");
    const[newPassword2, setNewPassword2] = React.useState("");
    const[oldPasswordError, setOldPasswordError] = React.useState("");
    const[newPasswordError1, setNewPasswordError1] = React.useState("");
    const[newPasswordError2, setNewPasswordError2] = React.useState("");


    let conFom = {
      oldPassword: "",
      newPassword1: "",
      newPassword2: ""
    }

    useEffect(() => {
      if(newPassword1 === newPassword2 && newPassword1.length > 7) {
        console.log(`Passwords validated ${newPassword1}`)
        setValidated(true);
        console.log(validated)
      } else {
        setValidated(false)
      }
      if(oldPasswordError[0]) {
        console.log(oldPasswordError[0].message);
      }
      if(newPasswordError1[0]) {
        console.log(newPasswordError1[0].message);
      }
      if(newPasswordError2[0]) {
        console.log(newPasswordError2[0].message);
      }
    }, [newPassword1, newPassword2, validated, newPasswordError1, newPasswordError2, oldPasswordError])
    
    const onSubmit = (e) => {
  
      e.preventDefault();
      setFormStatus("Submiting...");
    //   console.log(e.target.elements[3])
      const { oldPasswordValue, newPassword1Value, newPassword2Value } = e.target.elements;
      // let input_errors = [];
    //   console.log(newPassword2Value)
      
      // if((email.value).match(validEmailRegex)) {
      //   email: email.value,
      // }

      conFom = {
        oldPassword: e.target.elements[0].value,
        newPassword1: e.target.elements[1].value,
        newPassword2: e.target.elements[2].value,
      }
      console.log(conFom)
      
      // console.log(conFom);
      axios.post("/api/v1/accounts/change_password/", {
        "old_password": conFom.oldPassword,
        "new_password1": conFom.newPassword1,
        "new_password2": conFom.newPassword2,
      }, {
        "headers": {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
        }
    }).then((res) => {
        console.log(res);
        // let user = localStorage.getItem("user");
        // console.log(user["password"])
        // user["password"] = conFom.newPassword1
        // console.log(user);
        
        setFormStatus("Submited");
        navigate("/profile");
        // isShowLogin = "true";
        // console.log(isShowLogin);
      }).catch((err) => {
        console.log(err);
        
        // console.log(err.response.data.errors[0].state["email"]);
        if(err.response.data.errors[0].state["old_password"]) {
          setOldPasswordError(err.response.data.errors[0].state["old_password"]) 
        } else {
          setOldPasswordError("");
        }
        if(err.response.data.errors[0].state["new_password1"]) {
          setNewPasswordError1(err.response.data.errors[0].state["new_password1"]) 
        } else {
          setNewPasswordError1("");
        }
        if(err.response.data.errors[0].state["new_password2"]) {
            setNewPasswordError2(err.response.data.errors[0].state["new_password2"]) 
          } else {
            setNewPasswordError2("");
          }
        // console.log(emailError);

        
        
      });
    }
    return (
        <div className="page-content height">
            {
            localStorage.getItem("user") ?
                <section className="content-section height">
                    <div className="contact-form">
                        <form onSubmit={onSubmit} >
                            <h1>Change password</h1>
                            <label>Old password</label>
                            <br></br>
                            <input type="text" name="old_password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <label style={{color:"red"}}>{oldPasswordError[0] ? oldPasswordError[0].message : ""}</label>
                            <br></br>
                            <label>New password</label>
                            <br></br>
                            <input type="password" name="new_password1" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)}/>
                            <label style={{color:"red"}}>{newPasswordError1[0] ? newPasswordError1[0].message : ""}</label>
                            <br></br>
                            <label>New password</label>
                            <br></br>
                            <input type="password" name="new_password2" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)}/>
                            <label style={{color:"red"}}>{newPasswordError2[0] ? newPasswordError2[0].message : ""}</label>
                            <br></br>
                            <button disabled={!validated} className={validated? "btn-submit" : "disabled-btn"} type="submit" value="Change Password">
                            {/* <button className={"btn-submit"} type="submit" value="REGISTER"> */}
                                {formStatus}
                            </button>
                        </form>
                    </div>
                </section>
            : <p>To see this page you have to <Link to="/login">Login</Link></p>
            }
        </div>
    );
  };

  export default ChangePassword;