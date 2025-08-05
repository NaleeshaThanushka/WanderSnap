import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ff4757'; // red
    if (passwordStrength < 50) return '#ffa502'; // orange
    if (passwordStrength < 75) return '#ffb142'; // yellow/orange
    return '#2ed573'; // green
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!formData.agreeTerms) {
      toast.warning('Please agree to the terms and conditions!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => navigate('/signin')
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        });
        setPasswordStrength(0);
      } else {
        toast.error(result.message || 'Registration failed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Server error, please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="signup-page">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="signup-container">
        <div className="signup-background">
          <div className="floating-elements" aria-hidden="true">
            <div className="floating-element passport">📘</div>
            <div className="floating-element camera">📷</div>
            <div className="floating-element luggage">🧳</div>
            <div className="floating-element globe">🌐</div>
            <div className="floating-element ticket">🎫</div>
          </div>
        </div>

        <div className="signup-form-container">
          <header className="signup-header">
            <div className="logo" aria-label="Wanderlust logo">
              <span className="logo-icon" role="img" aria-hidden="false">🌍</span>
              <span className="logo-text">Wanderlust</span>
            </div>
            <h2 className="signup-title">Start Your Journey</h2>
            <p className="signup-subtitle">Create your account to explore the world</p>
          </header>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <div className="input-wrapper">
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="form-input"
                    required
                    autoComplete="given-name"
                  />
                  <span className="input-icon" aria-hidden="true">👤</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <div className="input-wrapper">
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="form-input"
                    required
                    autoComplete="family-name"
                  />
                  <span className="input-icon" aria-hidden="true">👤</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                  autoComplete="email"
                />
                <span className="input-icon" aria-hidden="true">📧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="sr-only">Create password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="form-input"
                  required
                  autoComplete="new-password"
                />
                <span className="input-icon" aria-hidden="true">🔒</span>
              </div>
              {formData.password && (
                <div className="password-strength" aria-live="polite">
                  <div className="strength-bar" aria-hidden="true">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </div>
                  <span
                    className="strength-text"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="form-input"
                  required
                  autoComplete="new-password"
                />
                <span className="input-icon" aria-hidden="true">🔒</span>
                {formData.confirmPassword && (
                  <span
                    className={`validation-icon ${
                      formData.password === formData.confirmPassword ? 'match' : 'no-match'
                    }`}
                    role="img"
                    aria-label={
                      formData.password === formData.confirmPassword
                        ? 'Passwords match'
                        : 'Passwords do not match'
                    }
                  >
                    {formData.password === formData.confirmPassword ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <a href="#" className="terms-link" tabIndex={0}>
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button type="submit" className="signup-button">
              <span>Create Account</span>
              <div className="button-ripple"></div>
            </button>
          </form>

          <footer className="signup-footer">
            <p>
              Already have an account?{' '}
              <a href="/signin" className="signin-link">
                Sign in here
              </a>
            </p>

            <div className="divider" aria-hidden="true">
              <span>or sign up with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button google">
                <span className="social-icon" role="img" aria-label="Google">🔍</span>
                Google
              </button>
              <button type="button" className="social-button facebook">
                <span className="social-icon" role="img" aria-label="Facebook">📘</span>
                Facebook
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignUp;