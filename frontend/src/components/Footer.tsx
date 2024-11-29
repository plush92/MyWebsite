import '../styles/Footer.css'; // Import the CSS file

// Since there are no props being passed to this component, we don't need to define a props type.
// The component is a functional component that doesn't require any additional typing.

const currentDate = new Date();
const year: number = currentDate.getFullYear(); // Explicitly type the year as a number
const name: string = "Brendan Duffy"; // Explicitly type the name as a string

// Define the Footer component as a functional component in TypeScript
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Created by {name}</p>
        <p className="footer-text">Copyright {year}</p>
      </div>
    </footer>
  );
};

export default Footer;

