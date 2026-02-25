import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DownloadPage from './pages/DownloadPage';
import ProxyPage from './pages/ProxyPage';
import HowItWorksPage from './pages/HowItWorksPage';
import NotFoundPage from './pages/NotFoundPage';
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
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
