import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { DashboardPresenter } from '../presenters/dashboardPresenter';

const Dashboard = () => {
  const navigate = useNavigate();
  const [carbonData, setCarbonData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const presenter = new DashboardPresenter({
    updateCarbonData: (carbon) => setCarbonData(carbon),
    updateWeatherData: (weather) => setWeatherData(weather),
  });

  useEffect(() => {
    presenter.loadAllData();
    const interval = setInterval(() => presenter.loadAllData(), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationClick = () => navigate('/lokasi');
  const handleDashboardonClick = () => navigate('/dashboard');

  const getStatusColor = (value, type) => {
    if (value == null) return 'gray';
    const thresholds = {
      co2: [400, 600],
      rainfall: [19, 51],
      pyrano: [400, 900],
      temperature: [26, 40],
      humidity: [69, 91]
    };
    const [low, high] = thresholds[type] || [];
    if (value > high) return 'red';
    if (value > low) return 'yellow';
    return 'green';
  };

  return (
    <section id="dashboard" className="section">
      <div className="dashboard-container">
        <div className="dashboard-header" data-aos="zoom-in" data-aos-delay="200" data-aos-easing="ease-in-out">
          <h2>Dashboard</h2>
        </div>

        <table className="dashboard-table" data-aos="zoom-in" data-aos-delay="300" data-aos-easing="ease-out-cubic">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='mobile-dash'>Eddy Station Dashboard</td>
              <td>
                <button className="location-button" onClick={handleLocationClick}>
                  Go to Location
                </button>
              </td>
              <td><span className="status">Active</span></td>
              <td>
                <button className="action-button" onClick={handleDashboardonClick}>
                  Dashboard
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="space-between-tables"></div>

        <table className="dashboard-table" data-aos="zoom-in" data-aos-delay="500" data-aos-easing="ease-out-cubic">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nilai</th>
              <th>Indikator</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Karbon Dioksida (CO₂)</td>
              <td>{carbonData ? `${carbonData.co2} ppm` : 'Loading...'}</td>
              <td>
                {carbonData ? (
                  <span className={`indicator ${getStatusColor(carbonData.co2, 'co2')}`}>
                    {carbonData.co2 > 600 ? 'Tinggi' : carbonData.co2 > 400 ? 'Normal' : 'Rendah'}
                  </span>
                ) : (
                  <span className="spinner"></span>
                )}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Curah Hujan</td>
              <td>{weatherData ? `${weatherData.rainfall} mm` : 'Loading...'}</td>
              <td>
                {weatherData ? (
                  <span className={`indicator ${getStatusColor(weatherData.rainfall, 'rainfall')}`}>
                    {weatherData.rainfall > 50 ? 'Tinggi' : weatherData.rainfall >= 20 ? 'Normal' : 'Rendah'}
                  </span>
                ) : (
                  <span className="spinner"></span>
                )}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Intensitas Matahari</td>
              <td>{weatherData ? `${weatherData.pyrano} W/m²` : 'Loading...'}</td>
              <td>
                {weatherData ? (
                  <span className={`indicator ${getStatusColor(weatherData.pyrano, 'pyrano')}`}>
                    {weatherData.pyrano > 900 ? 'Tinggi' : weatherData.pyrano >= 400 ? 'Normal' : 'Rendah'}
                  </span>
                ) : (
                  <span className="spinner"></span>
                )}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Temperature</td>
              <td>{weatherData ? `${weatherData.temperature?.toFixed(2)} °C` : 'Loading...'}</td>
              <td>
                {weatherData ? (
                  <span className={`indicator ${getStatusColor(weatherData.temperature, 'temperature')}`}>
                    {weatherData.temperature > 40 ? 'Tinggi' : weatherData.temperature >= 27 ? 'Normal' : 'Rendah'}
                  </span>
                ) : (
                  <span className="spinner"></span>
                )}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Humidity</td>
              <td>{weatherData ? `${weatherData.humidity}%` : 'Loading...'}</td>
              <td>
                {weatherData ? (
                  <span className={`indicator ${getStatusColor(weatherData.humidity, 'humidity')}`}>
                    {weatherData.humidity > 90 ? 'Tinggi' : weatherData.humidity >= 70 ? 'Normal' : 'Rendah'}
                  </span>
                ) : (
                  <span className="spinner"></span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
