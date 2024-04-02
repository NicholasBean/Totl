import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LoginPage'; // Assuming your LoginPage component file is located here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage /> {/* Render LoginPage instead of App initially */}
  </React.StrictMode>
);
