import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of nature/travel images from Unsplash
  const images = [
    'https://images.pexels.com/photos/16508230/pexels-photo-16508230.jpeg',
    'https://images.pexels.com/photos/13391116/pexels-photo-13391116.jpeg',
    'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://wallpapercat.com/w/full/d/2/6/639845-2560x1440-desktop-hd-sri-lanka-background-photo.jpg',
    'https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3JpbGFua2F8ZW58MHx8MHx8fDA%3D'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="header">
      <div className="header-content">
        <nav className="navbar">
          <div className="logo">
            <h1>Wanderlust</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <div className="hero-section">
          <div className="hero-text">
            <h2>Discover Nature's Beauty</h2>
            <p>Explore breathtaking landscapes and create unforgettable memories</p>
            <button className="cta-button">Start Your Journey</button>
          </div>
        </div>
      </div>
      
      <div className="image-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      
      <div className="image-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;