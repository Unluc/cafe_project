// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";

import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Header() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      
    // const[formStatus, setFormStatus] = React.useState("Login");
    const navigate = useNavigate();
    
    const handleLogoutClick = (e) => {
      
      e.preventDefault();
      // setFormStatus("Submiting...");
    
      axios.post("/api/v1/accounts/logout/", {}, {
        "headers": {
          'Content-Type': 'application/json',
        }
    }).then((res) => {
        console.log(res);
        // setFormStatus("Submited");
        localStorage.removeItem("user");
        rerenderParentCallback();
        console.log(JSON.parse(localStorage.getItem("user")))
        setToggle(!toggle)
        navigate("/");
      }).catch((err) => {
        console.log(err);
      });
    }
   
    // const [isShowLogin, setIsShowLogin] = useState(true);
    // const [isShowSignUp, setIsShowSignUp] = useState(true);
  
    
    const user = JSON.parse(localStorage.getItem("user"));
    const [ignored, forceUpdate] = useState(false);
  
    const rerenderParentCallback = () => {
      forceUpdate(!ignored);
    }
  
    // const handleLoginClick = () => {
    //   setIsShowLogin((isShowLogin) => !isShowLogin);
    // };
  
  
    // const handleSignUpClick = () => {
    //   setIsShowSignUp((isShowSignUp) => !isShowSignUp);
    // };
  
    // const handleClick = () => {
    //   handleLoginClick();
    // };
  
    // const handleSignClick = () => {
    //   handleSignUpClick();
    // };

    const [toggle, setToggle] = useState(false);
    const [navTag, setNavTag] = useState("");

    // const NAV_BUTTON = document.querySelector(".nav-btn");
    // const NAV_LIST = document.querySelector(".nav-list");
    
    // useEffect(() => {
      

    //   NAV_BUTTON.onclick = () => {
    //     NAV_LIST.classList.toggle("show-navigation");
    //     // NAV_LIST.classList.toggle("show-navigation");
    //   }

    //   NAV_LIST.onclick = () => {
    //     if (NAV_LIST.classList.contains("show-navigation")) {
    //       NAV_LIST.classList.remove("show-navigation");
    //     }
    //   }
    // })
    
   
    // function openNav() {
    //   NAV_BUTTON.onclick = () => {
    //     NAV_LIST.classList.toggle("show-navigation");
    // }
    // }
    
    // function closeNav() {
    //   document.getElementById("nav-list").style.width = "0%";
    // }
    
    return (
      <header className="Page-header">
        <button onClick={() => navigate("/")} className="Page-logo">
          <img className="Logo-img" src="logo2.jpg" alt="Logo" />
        </button>
  
          {/* <a href="javascript:;" className="mobile-btn" id="nav-btn">
            &#9776
              <img src="images/nav-button.png" alt="Mobile navigation reveal button" />
          </a> */}
        {!toggle ? 
          <a href="javascript:;" onClick={() => setToggle(!toggle)} className="mobile-btn nav-btn" >
          <img src="menu-icon.svg" alt="Mobile navigation reveal button"/>
        </a> : ""}
        

        

        
        <nav className={"Page-navigation" + (toggle ? "show-navigation navv-list " : "")}>
        {toggle ? <a className="close" onClick={() => setToggle(!toggle)}>&times;</a> : ""}
        
          <ul className="Navigation-list">
            <li>
              <Link onClick={() => setToggle(!toggle)} to="/">Home</Link>
            </li>
            <li>
                <Link onClick={() => setToggle(!toggle)} to="/about-us">About Us</Link>
            </li>
            <li>
                <Link onClick={() => setToggle(!toggle)} to="/gallery">Gallery</Link>
            </li>
            <li>
                <Link onClick={() => setToggle(!toggle)} to="/menu">Menu</Link>
            </li>
            <li>
              <Link onClick={() => setToggle(!toggle)} to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link onClick={() => setToggle(!toggle)} to="/location">Location</Link>
            </li>
          </ul>
          
        
        <div className={"profile-settings" + (toggle ? "show-navigation" : "")}>
        {
          user ? (
            <>
              <div className='logfrm'>
                <Link onClick={() => setToggle(!toggle)} className="loginicon" to="/profile">Profile</Link> 
              </div>
              <div className='logfrm'>
                <span onClick={handleLogoutClick} className="loginicon">
                  Log Out
                </span>
              </div>
            </>
  
            
          ) : (
            
            <>
            
              <div className='logfrm'>
              <Link onClick={() => setToggle(!toggle)} to="/login" className="loginicon">Login</Link>
              {/* <span onClick={handleClick} className="loginicon">
                Login
              </span> */}
            </div>
            {/* <LoginForm isShowLogin={isShowLogin} forceRerender={rerenderParentCallback}/> */}
  
            
  
            <div className='logfrm'>
            <Link onClick={() => setToggle(!toggle)} to="/signup" className="loginicon">SignUp</Link>
              {/* <span onClick={handleSignClick} className="loginicon">
                Sign Up
              </span> */}
            </div>
            {/* <SignUpForm isShowSignUp={isShowSignUp} /> */}
            </>
          )
        }
        
        </div>
        
  </nav>
        {/* <img className="burger-menu" id="nav-btn"  src="menu-icon.svg"/> */}
      </header>
    );
  }