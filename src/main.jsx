import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import LocationPage from './components/LocationPage';
import DashboardPage from './components/DashboardPage';
import DownloadPage from './components/DownloadPage';
import 'leaflet/dist/leaflet.css';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  once: false,
  duration: 800,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />               
        <Route path="/lokasi" element={<LocationPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} /> 
        <Route path="/download" element={<DownloadPage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
