// import logo from './logo.svg';
import './App.css';
import ContactForm from './pages/contact-us/ContactUs.js';
// import Header from "./components/header/Header.js";
import HomePage from './pages/home/Home.js';
import Menu from './pages/menu/Menu.js';
import Product from './pages/product/Product.js';
import AboutUs from './pages/about-us/AboutUs.js';
import Gallery from './pages/gallery/Gallery.js';
import GalleryDetail from './pages/gallery-detail/GalleryDetail.js';
import Location from './pages/location/Location.js';
import Profile from './pages/profile/Profile.js';
// import Footer from './components/footer/Footer.js';
import LoginForm from './components/login/Login.js';
import SignUpForm from './components/signUp/SignUp.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import React, { useState, useEffect } from "react";

// const NAV_BUTTON = document.querySelector("#nav-btn");
// const NAV_LIST = document.querySelector("#nav-list");

// // Show/hide navigation on mobile if button is clicked
// NAV_BUTTON.onClick = () => {
//     NAV_LIST.classList.toggle("show-navigation");
// }

// // Hide the navigation if a link is clicked
// NAV_LIST.onClick = () => {
//   if (NAV_LIST.classList.contains("show-navigation")) {
//       NAV_LIST.classList.remove("show-navigation");
//   }
// }


function App() {
  // const [isShowLogin, setIsShowLogin] = useState(true);

  // const handleLoginClick = () => {
  //   setIsShowLogin((isShowLogin) => !isShowLogin);
  // };
  return (
    
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>


    //That was in original 
    // <a href="javascript:;" class="mobile-btn" id="nav-btn">
    //       <img src="#" alt="Mobile navigation reveal button" />
    //     </a>

    
    <Router>
      {/* <div>
        <ul>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </div> */}

      <div className='App'>
        <Header />
        {/* <HomePage /> */}
      </div> 

      <Routes>
        <Route exact path='/contact-us' element={<ContactForm />} />
        <Route exact path='/' element={<HomePage />}/>
        <Route exact path='/menu' element={<Menu />} />
        <Route exact path='/menu/product/:slug' element={<Product />} />
        <Route exact path='/about-us' element={<AboutUs />} />
        <Route exact path='/gallery' element={<Gallery />} />
        <Route exact path='/gallery/:slug' element={<GalleryDetail />} />
        <Route exact path='/location' element={<Location />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </Router>
    
  );
}

// function Header() {
//   return (
//     // <div className='App'>
//       <header className="Page-header">
//         <Link to="/" className="Page-logo">
//           <img className="Logo-img" src="logo2.jpg" alt="Logo" />
//         </Link>
    
//         <nav className="Page-navigation" id="nav-list">
//         <ul className="Navigation-list">
//             <li>
//             {/* <a href="index.html">Home</a> */}
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//                 <Link to="/about-us">About Us</Link>
//             </li>
//             <li>
//                 <Link to="/gallery">Gallery</Link>
//             </li>
//             <li>
//                 <Link to="/menu">Menu</Link>
//             </li>
//             <li>
//               <Link to="/contact-us">Contact Us</Link>
//             </li>
//         </ul>
//         </nav>
//       </header>
//     // </div> 
//   )
// }




function Header() {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  // const[formStatus, setFormStatus] = React.useState("Login");
  
  
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
    }).catch((err) => {
      console.log(err);
    });
  }









  const [isShowLogin, setIsShowLogin] = useState(true);
  const [isShowSignUp, setIsShowSignUp] = useState(true);

  
  const user = JSON.parse(localStorage.getItem("user"));
  const [ignored, forceUpdate] = useState(0);

  const rerenderParentCallback = () => {
    forceUpdate(ignored + 1);
  }

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };


  const handleSignUpClick = () => {
    setIsShowSignUp((isShowSignUp) => !isShowSignUp);
  };

  const handleClick = () => {
    handleLoginClick();
  };

  const handleSignClick = () => {
    handleSignUpClick();
  };
  

  

  function openNav() {
    document.getElementById("nav-list").style.width = "60%";
  }
  
  function closeNav() {
    document.getElementById("nav-list").style.width = "0%";
  }
  
  return (
    <header className="Page-header">
      <Link to="/" className="Page-logo">
        <img className="Logo-img" src="logo2.jpg" alt="Logo" />
      </Link>

        {/* <a href="javascript:;" className="mobile-btn" id="nav-btn">
          &#9776
            <img src="images/nav-button.png" alt="Mobile navigation reveal button" />
        </a> */}
      
      <nav className="Page-navigation" id="nav-list">
        <a className="closebtn" onClick="closeNav()">&times;</a>
        <ul className="Navigation-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/about-us">About Us</Link>
          </li>
          <li>
              <Link to="/gallery">Gallery</Link>
          </li>
          <li>
              <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
        </ul>
      </nav>
      

      {
        user ? (
          <>
            {/* <Link to="/profile">Profile</Link>  */}
          
            <div className='logfrm'>
              <span onClick={handleLogoutClick} className="loginicon">
                Log Out
              </span>
            </div>
          </>

          
        ) : (
          <>
            <div className='logfrm'>
            <span onClick={handleClick} className="loginicon">
              Login
            </span>
          </div>
          <LoginForm isShowLogin={isShowLogin} forceRerender={rerenderParentCallback}/>

          

          <div className='logfrm'>
            <span onClick={handleSignClick} className="loginicon">
              Sign Up
            </span>
          </div>
          <SignUpForm isShowSignUp={isShowSignUp} />
          </>
        )
      }
      
      
      

      <img className="burger-menu" onClick="openNav()" src="menu-icon.svg"/>
    </header>
  );
}
export default App;
