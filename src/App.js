// import logo from './logo.svg';
import './App.css';
import ContactForm from './pages/contact-us/ContactUs.js';
// import Header from "./components/header/Header.js";
import HomePage from './pages/home/Home.js';
import Menu from './pages/menu/Menu.js';
// import Footer from './components/footer/Footer.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
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
        {/* <Route exact path='/about-us' element={<AboutUs />} /> */}
      </Routes>
    </Router>
    
  );
}

function Header() {
  return (
    // <div className='App'>
      <header className="Page-header">
        <Link to="/" className="Page-logo">
          <img className="Logo-img" src="logo2.jpg" alt="Logo" />
        </Link>
    
        <nav className="Page-navigation" id="nav-list">
        <ul className="Navigation-list">
            <li>
            {/* <a href="index.html">Home</a> */}
              <Link to="/">Home</Link>
            </li>
            <li>
                {/* <a href="index.html">About us</a> */}
                <Link to="/about-us">About us</Link>
            </li>
            <li>
                {/* <a href="index.html">Menu</a> */}
                <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
        </ul>
        </nav>
      </header>
    // </div> 
  )
}

export default App;
