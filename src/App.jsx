import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar onSearch={handleSearch} />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container flex-between">
            <p className="footer-copyright">© 2026 System Design Hub. Built for architects.</p>
            <div className="footer-links">
              <a href="#">Resources</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
