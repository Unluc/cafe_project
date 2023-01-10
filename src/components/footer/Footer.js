import "./Footer.css";

function Footer() {
    return(
        <footer className="page-footer">
            <div className="footer-content">
                <a href="#top">Back to Top</a>
                
                <p>Coffee Shop &copy;2022</p>

                <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Site Map</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;

// window.onload = () => {
//     this.addEventListener("mousemove", (e) => {
//       var y = e.pageY;
//       let foot = document.querySelector(".page-footer");
//       (y >= window.innerHeight - 75) ? foot.style.bottom = "0px" : foot.style.bottom = "75px";
//       console.log("Its working");
//     })
//   }