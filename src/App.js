import logo from './logo.svg';
import './App.css';
import ContactForm from './contact-us/ContactUs';

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
    <div className='App'>
      <header className="Page-header">
        <a href="index.html" className="Page-logo">
          <img className="Logo-img" src="logo2.jpg" alt="Logo" />
        </a>
       
        <nav className="Page-navigation" id="nav-list">
          <ul className="Navigation-list">
            <li><a href="index.html">Main</a></li>
            <li><a href="index.html">About us</a></li>
            <li><a href="index.html">Menu</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul>
        </nav>
      </header>
      <ContactForm />
    </div> 
  );
}

export default App;
