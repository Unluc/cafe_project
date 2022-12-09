import "./Footer.css";

function Footer() {
    return(
        <footer className="page-footer">
            <div className="footer-content">
                <a href="#top">Back to Top</a>

                <p>LOGO &copy;2022</p>

                <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Site Map</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;