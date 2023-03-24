import Footer from "../../components/footer/Footer.js";
import NewProducts from "../../components/new-products/NewProducts.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="Home-container">
          <section className="hero">
            <div className="hero-text">
              <h1 className="hero-title">Welcome to Coffee Shop!</h1>

              <p className="hero-subtitle">
                Premium coffee at affordable prices
              </p>
            </div>

            <Link to="/menu" className="btn-primary">See our menu</Link>
          </section>
    
    <main className="page-content">
      

      <NewProducts />

      <section className="content-section">
        <h2>Our Story</h2>

        <p>
          It all started in 1992 when fashion designer Markus Sorenson and 
          enterepreneur Julia Woodford met a local fashion showand bonded over their 
          passionfor quality clothing.
        </p>

        <p>
          They set up LOGO soon after as a line dedicated to delivering fashionable, 
          high quality clothing at affordable prices. To this day, they believe 
          strongly that looking good shouldn`t come at a cost.
        </p>

        <div className="content-video">
          <iframe 
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="YouTube video player" 
            frameBorder="0"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            >
          </iframe>
        </div>
      </section>

      <section className="content-section">
        <h2>Opening Times</h2>

        <table>
          <tbody>
            <tr>
              <th>Day</th><th>Times</th>
            </tr>

            <tr>
              <td>Weekdays</td><td>8am - 5pm</td>
            </tr>

            <tr>
              <td>Saturdays</td><td>9am - 4pm</td>
            </tr>

            <tr>
              <td>Sundays</td><td>10am - 3pm</td>
            </tr>  
          </tbody>
                
        </table>
        
        <Link to="/contact-us" className="btn-primary">Want to get in touch?</Link>
      </section>
    </main>
    
    {/* <Footer /> */}
    </div>
    );
}

export default HomePage;