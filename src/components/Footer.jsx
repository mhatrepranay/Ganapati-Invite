import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Made with ❤️ by <strong>Pranay Mhatre</strong> – The Software Developer</p>
            <img src={require('../assets/Photo-with-thar.jpg')} alt="Pranay Mhatre" className="footer-img" />
        </footer>
    );
};

export default Footer;
