import React, { useState, useEffect } from 'react';
import { Home, MapPin, Image, User, Menu, X, Compass, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="nav-icon" /> },
    { to: '/destinations', label: 'Destinations', icon: <MapPin className="nav-icon" /> },
    { to: '/gallery', label: 'Gallery', icon: <Image className="nav-icon" /> },
  ];

  const handleNavClick = (path) => {
    setActiveItem(path);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => handleNavClick('/')}>
            <div className="brand-icon">
              <Compass className="compass-icon" />
              <div className="brand-glow"></div>
            </div>
            <div className="brand-text">
              <span className="brand-name">TravelLux</span>
              <span className="brand-tagline">Premium Adventures</span>
            </div>
          </div>

          <div className="navbar-nav">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to)}
                className={`nav-link ${activeItem === item.to ? 'nav-link-active' : ''}`}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
                <div className="nav-indicator"></div>
              </button>
            ))}
          </div>

          <div className="navbar-actions">
            {isLoggedIn ? (
              <button className="profile-button" onClick={handleLogout}>
                <LogOut className="profile-icon" />
                <span className="profile-text">Logout</span>
              </button>
            ) : (
              <button className="profile-button" onClick={() => handleNavClick('/signup')}>
                <User className="profile-icon" />
                <span className="profile-text">Account</span>
              </button>
            )}

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="toggle-icon" /> : <Menu className="toggle-icon" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-open' : ''}`}>
        <div className="mobile-menu">
          <div className="mobile-header">
            <div className="mobile-brand">
              <Compass className="mobile-compass" />
              <span className="mobile-brand-name">TravelLux</span>
            </div>
          </div>

          <div className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to)}
                className={`mobile-nav-item ${activeItem === item.to ? 'mobile-nav-active' : ''}`}
              >
                <div className="mobile-nav-icon">{item.icon}</div>
                <span className="mobile-nav-label">{item.label}</span>
                <div className="mobile-nav-arrow">→</div>
              </button>
            ))}

            {isLoggedIn ? (
              <button onClick={handleLogout} className="mobile-nav-item mobile-profile">
                <div className="mobile-nav-icon">
                  <LogOut className="nav-icon" />
                </div>
                <span className="mobile-nav-label">Logout</span>
                <div className="mobile-nav-arrow">→</div>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('/signin')}
                className="mobile-nav-item mobile-profile"
              >
                <div className="mobile-nav-icon">
                  <User className="nav-icon" />
                </div>
                <span className="mobile-nav-label">My Account</span>
                <div className="mobile-nav-arrow">→</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
