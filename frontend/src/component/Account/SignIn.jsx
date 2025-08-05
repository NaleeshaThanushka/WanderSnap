import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // 🔁 Redirect to home if already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store login status
        localStorage.setItem('isLoggedIn', 'true');

        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
        });

        navigate('/'); // Go to home
      } else {
        toast.error(data.message || 'Invalid email or password', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Server error. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="signin-container">
      <ToastContainer />

      <div className="signin-background">
        <div className="floating-elements">
          <div className="floating-element plane">✈</div>
          <div className="floating-element compass">🧭</div>
          <div className="floating-element mountain">🏔</div>
          <div className="floating-element palm">🌴</div>
        </div>
      </div>

      <div className="signin-form-container">
        <div className="signin-header">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">Wanderlust</span>
          </div>
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Continue your journey with us</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
                required
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                required
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="signin-button">
            <span>Sign In</span>
            <div className="button-ripple"></div>
          </button>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <a href="/signup" className="signup-link">Sign up now</a></p>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-button google">
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button className="social-button facebook">
              <span className="social-icon">📘</span>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
