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
            frameborder="0"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </section>

      <section className="content-section">
        <h2>Product Categories</h2>

        <div className="gallery-container">
          <a href="images/hoodie-green.jpg" className="gallery-card">
            <img src="images/hoodie-green.jpg" alt="hoodies" />
            <p className="product-title">Hoodies</p>
          </a>

          <a href="images/pullover-green.jpg" className="gallery-card">
            <img src="images/pullover-green.jpg" alt="pullovers" />
            <p className="product-title">Pullovers</p>
          </a>

          <a href="images/tshirt-grey.jpg" className="gallery-card">
            <img src="images/tshirt-grey.jpg" alt="tshirts" />
            <p className="product-title">T-shirts</p>
          </a>

          <a href="images/beanie-red.jpg" className="gallery-card">
            <img src="images/beanie-red.jpg" alt="hats" />
            <p className="product-title">Hats</p>
          </a>

          <a href="images/sunglasses.jpg" className="gallery-card">
            <img src="images/sunglasses.jpg" alt="sunglasses" />
            <p className="product-title">Sunglasses</p>
          </a>

          <a href="images/belt.jpg" className="gallery-card">
            <img src="images/belt.jpg" alt="belts" />
            <p className="product-title">Belts</p>
          </a>
        </div>
      </section>

      <section className="content-section">
        <h2>Opening Times</h2>

        <table>
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
        </table>
        
        <Link to="/contact-us" className="btn-primary">Want to get in touch?</Link>
      </section>
    </main>
    
    <Footer />
    </div>
    );
}

export default HomePage;