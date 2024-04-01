import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './LoginPage.css'; // Import CSS file for styling

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., validation, API call
    console.log(formData);
    // Redirect to App component after form submission
    renderApp();
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    // Clear form data when switching between login and signup
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    });
  };

  const handleGoogleSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '410218340206-284a7b6075rag3eci4k8kje62ar7s5to.apps.googleusercontent.com',
        callback: handleGoogleCallbackResponse,
      });
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In API is not loaded.');
    }
  };

  const handleGoogleCallbackResponse = (response) => {
    if (response.credential) {
      // Google authentication successful, render App component
      renderApp();
    } else {
      // Google authentication failed or cancelled
      console.log('Google Sign-In failed or cancelled.');
    }
  };

  const renderApp = () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  };

  return (
    <div className="login-page">
        <div className="top-bar">
          <div className="brand">
            <span className="totl">TOTL</span><span className="bib">Bib</span>
          </div>
        </div>
      <div className="login-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <button className="switch-button" onClick={switchForm}>
          {isLogin ? 'Create an account' : 'Back to Login'}
        </button>
        <button className="google-sign-in-button" onClick={handleGoogleSignIn}>
          Google Sign-In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
