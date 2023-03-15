// import logo from './logo.svg';
import './App.css';
import ContactForm from './pages/contact-us/ContactUs.js';
import Header from "./components/header/Header.js";
import HomePage from './pages/home/Home.js';
import Menu from './pages/menu/Menu.js';
import Product from './pages/product/Product.js';
import AboutUs from './pages/about-us/AboutUs.js';
import Gallery from './pages/gallery/Gallery.js';
import GalleryDetail from './pages/gallery-detail/GalleryDetail.js';
import Location from './pages/location/Location.js';
import Profile from './pages/profile/Profile.js';
import Footer from './components/footer/Footer.js';
import Login from './pages/login/Login.js';
import SignUp from './pages/signUp/SignUp.js';
import EmailVerification from './pages/email-verification/EmailVerification.js';
import ChangePassword from './pages/change-password/ChangePassword.js';
import PasswordResetRequest from './pages/password-reset-request/PasswordResetRequest.js';
import PasswordReset from './pages/password-reset/PasswordReset.js';
import EmailResetRequest from './pages/email-reset-request/EmailResetRequest.js';
import EmailReset from './pages/email-reset/EmailReset.js';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";


function App() {
  const [ignored, forceUpdate] = useState(false);
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

      <div className='App'>
        <Header />
        <Routes>
          <Route exact path='/contact-us' element={<ContactForm />} />
          <Route exact path='/' element={<HomePage />}/>
          <Route exact path='/menu' element={<Menu />} />
          <Route exact path='/menu/:slug' element={<Product />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/gallery' element={<Gallery />} />
          <Route exact path='/gallery/:slug' element={<GalleryDetail />} />
          <Route exact path='/location' element={<Location />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/login' element={<Login forceUpdate={forceUpdate} ignored={ignored}/>} />
          <Route exact path='/signup' element={<SignUp forceUpdate={forceUpdate}/>} />
          <Route exact path='/email-verification' element={<EmailVerification />} />
          <Route exact path='/change-password' element={<ChangePassword />} />
          <Route exact path='/reset-password-request' element={<PasswordResetRequest />} />
          <Route exact path='/reset-password/:id/:slug' element={<PasswordReset />} />
          <Route exact path='/reset-email-request' element={<EmailResetRequest />} />
          <Route exact path='/reset-email/:id/:slug' element={<EmailReset />} />
        </Routes>
        <Footer />
      </div> 

      
    </Router>
    
  );
}

export default App;
