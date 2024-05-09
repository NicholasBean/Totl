import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Citations from "./components/pages/Citations";
import MyLib from './components/pages/MyLib';
import Contact from './components/pages/Contact';
import LoginPage from './components/pages/LoginPage';
import BGImageButton from './components/pages/links/BGImageButton';
import { useState } from 'react';

// Componenet imports
import InputAuthors from "./components/pages/InputAuthors";
import ShowAuthors from "./components/pages/ShowAuthors";

import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [bgImg, setBgImg] = useState("container");
  return (
    <div className={bgImg}> 
      <Router>
        <Routes>
          {/* Define login route */}
          <Route path="/" element={<LoginPage />} />
          {/* Define protected routes */}
          <Route
            path="/*"
            element={
              <>
                {/* Navbar rendered for all routes except login */}
                <Navbar />
                <BGImageButton setBgImg={setBgImg}/>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/mylib" element={<MyLib />} />
                  <Route path="/citations" element={<Citations />} /> 
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/InputAuthors" element={<InputAuthors />} />
                  <Route path="/ShowAuthors" element={<ShowAuthors />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
