// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";

import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";


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
        // console.log(res);
        // setFormStatus("Submited");
        localStorage.removeItem("user");
        rerenderParentCallback();
        // console.log(JSON.parse(localStorage.getItem("user")))
        checkToggle()
        navigate("/");
      }).catch((err) => {
        // console.log(err);
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
    const [profileToggle, setProfileToggle] = useState(false);
    // const [navTag, setNavTag] = useState("");

    // const NAV_BUTTON = document.querySelector(".nav-btn");
    // const NAV_LIST = document.querySelector(".nav-list");

    const [width, setWidth]   = useState(window.innerWidth);
    // const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
      if (window.innerWidth > 1001 && toggle) {
        setToggle(!toggle);
      }
        // setHeight(window.innerHeight);
    }
    useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      
      return () => window.removeEventListener("resize", updateDimensions);
  }, [window]);

    function checkToggle() {
      if (window.innerWidth < 1001) {
        setToggle(!toggle);
      }   
    }
    // console.log(width)
    
    // const focusRef = useRef(document.querySelector(".profile-column"));
    // console.log(focusRef)
    
    // if (focusRef.focus()) {
    //   setProfileToggle(!profileToggle)
    // }

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
          <a href="#" onClick={() => setToggle(!toggle)} className="mobile-btn nav-btn" >
          <img src="menu-icon.svg" alt="Mobile navigation reveal button"/>
        </a> : ""}
        

        

        
        <nav className={"Page-navigation" + (toggle ? "show-navigation navv-list " : "")}>
          {toggle ? <a className="close" onClick={() => checkToggle()}>&times;</a> : ""}
        
          <ul className="Navigation-list">
            <li>
              <Link onClick={() => checkToggle()} to="/">Home</Link>
            </li>
            <li>
                <Link onClick={() => checkToggle()} to="/about-us">About Us</Link>
            </li>
            <li>
                <Link onClick={() => checkToggle()} to="/gallery">Gallery</Link>
            </li>
            <li>
                <Link onClick={() => checkToggle()} to="/menu">Menu</Link>
            </li>
            <li>
              <Link onClick={() => checkToggle()} to="/contact-us">Contact Us</Link>
            </li>
            {toggle ? 
              <li>
                <Link onClick={() => checkToggle()} to="/location">Location</Link>
              </li>
            :
              ""
            }
          </ul>
          
        
          <div className={"profile-settings" + (toggle ? "show-navigation" : "")}>
            {!toggle ? 
              <Link to="/location"><img className="location-icon" src="location-icon.png"/></Link>
            :
              ""
            }
          {
            user ? (
              toggle ? 
                <div>
                  <div className='logfrm'>
                    <Link onClick={() => checkToggle()} className="loginicon" to="/profile">Profile</Link> 
                  </div>
                  <div className='logfrm'>
                    <p onClick={handleLogoutClick} className="loginicon">
                      Log Out
                    </p>
                  </div>
                </div>
              :
                <div className='logfrm profile-column' onClick={() => setProfileToggle(!profileToggle)}>
                  <img className="location-icon" src="profile.png"/>
                  {profileToggle ? 
                  <div className="profile-dropdown">
                    <Link className="loginicon" to="/profile">Profile</Link>
                    <span onClick={handleLogoutClick} className="loginicon">
                      Log Out
                    </span>
                  </div>
                  :
                  ""}                
                </div>            
            ) : (
              toggle ? 
              <>
                <div className='logfrm'>
                    <Link onClick={() => checkToggle()} to="/login" className="loginicon">Login</Link>
                </div>  

                <div className='logfrm'>
                    <Link onClick={() => checkToggle()} to="/signup" className="loginicon">SignUp</Link>
                </div>
              </>

            :
            <div className='logfrm profile-column' onClick={() => setProfileToggle(!profileToggle)}>
              <img className="location-icon" src="profile.png"/>
              {profileToggle ? 
                <div className="profile-dropdown">
                  <Link to="/login" className="loginicon">Login</Link>
                  <Link to="/signup" className="loginicon">SignUp</Link>
                </div>
              :
                ""}                
            </div>
            )
          }
          
          </div>
        
        </nav>
      </header>
    );
  }