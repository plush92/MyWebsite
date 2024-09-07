import '../styles/Footer.css'; // Import the CSS file

const currentDate = new Date();
const year = currentDate.getFullYear();
const name = "Brendan Duffy";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Created by {name}</p>
        <p className="footer-text">Copyright {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
