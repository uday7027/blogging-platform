import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="simple-footer">
      <p>
        © {new Date().getFullYear()} BloggingPlatform · Built with React & Node.js
      </p>
    </footer>
  );
};

export default Footer;
