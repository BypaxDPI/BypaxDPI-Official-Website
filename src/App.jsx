import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DownloadPage from './pages/DownloadPage';
import ProxyPage from './pages/ProxyPage';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import ScrollProgress from './components/animations/ScrollProgress';
import './App.css'; 

function App() {
  return (
    <>
        <ScrollProgress />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/proxy" element={<ProxyPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
