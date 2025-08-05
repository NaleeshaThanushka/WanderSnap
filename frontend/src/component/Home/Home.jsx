// src/component/Home/Home.jsx
import React from 'react';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header /> {/* ✅ Only show Header on home page */}

      <section className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome to Sri Lanka</h2>
          <p>
            Discover the pearl of the Indian Ocean with its pristine beaches, ancient temples, 
            lush tea plantations, and warm hospitality. From the cultural triangle in the north 
            to the golden beaches in the south, Sri Lanka offers an unforgettable journey through 
            diverse landscapes and rich heritage.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>9</h3>
              <p>Provinces</p>
            </div>
            <div className="stat-card">
              <h3>8</h3>
              <p>UNESCO Sites</p>
            </div>
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Beaches</p>
            </div>
            <div className="stat-card">
              <h3>2500+</h3>
              <p>Years of History</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-content">
          <h2>Why Choose Sri Lanka?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏖️</div>
              <h3>Pristine Beaches</h3>
              <p>From the golden sands of Unawatuna to the surf breaks of Arugam Bay, Sri Lanka's coastline offers something for every beach lover.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Ancient Heritage</h3>
              <p>Explore 2,500 years of history through ancient cities, sacred temples, and archaeological wonders that tell the story of our civilization.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Tea Plantations</h3>
              <p>Journey through rolling hills covered in emerald tea estates, where the world's finest Ceylon tea is grown and harvested.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🐘</div>
              <h3>Wildlife Safari</h3>
              <p>Encounter elephants, leopards, and exotic birds in national parks that protect some of the world's most diverse ecosystems.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍛</div>
              <h3>Culinary Delights</h3>
              <p>Savor the rich flavors of Sri Lankan cuisine, from spicy curries to fresh seafood, enhanced with aromatic spices and tropical fruits.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏔️</div>
              <h3>Hill Country</h3>
              <p>Escape to the cool mountains of Nuwara Eliya and Ella, where misty peaks and scenic train rides create unforgettable memories.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Your Sri Lankan Adventure</h2>
          <p>Ready to explore the wonders of Sri Lanka? Click on any province in the map above to discover amazing destinations and plan your perfect getaway.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Plan Your Trip</button>
            <button className="cta-btn secondary">Download Guide</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
