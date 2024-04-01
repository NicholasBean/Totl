import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Citations from "./pages/Citations";
import MyLib from './pages/MyLib';
import Contact from './pages/Contact';
import Navbar from './Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div className="container"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/mylib" exact element={<MyLib />} />
          <Route path="/citations" exact element={<Citations />} /> 
          <Route path="/contact" exact element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
