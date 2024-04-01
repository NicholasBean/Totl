import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './pages/Home';
import Citations from './pages/Citations';
import About from './pages/About';
import Contact from './pages/Contact';


import Navbar from './Navbar/Navbar';

import './App.css';


function App() {
  const google = window.google;

  const handleCallBackResponse = (response) =>{
    console.log('Encoded JWT ID token: ' + response.credential);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '410218340206-284a7b6075rag3eci4k8kje62ar7s5to.apps.googleusercontent.com',
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("Sign-in-div"), {
        theme: "outline", 
        size: "large"
      });
  }, []);


  return (
    <div className="container">
      <div id="sign-in-div"></div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/citations" exact element={<Citations />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
