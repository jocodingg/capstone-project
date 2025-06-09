import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const [carbonData, setCarbonData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const carbonRes = await fetch('https://backend-express-production-1aad.up.railway.app/api/carbon/db/simulate');
      const microclimateRes = await fetch('https://backend-express-production-1aad.up.railway.app/api/microclimate/db/simulate');

      const carbonJson = await carbonRes.json();
      const weatherJson = await microclimateRes.json();

      setCarbonData(carbonJson);
      setWeatherData(weatherJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // fetch awal
    const interval = setInterval(fetchData, 5000); // polling tiap 5 detik

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, []);

  const handleLocationClick = () => {
    navigate('/lokasi');
  };

  const handleDashboardonClick = () => {
    navigate('/dashboard');
  };

  const getStatusColor = (value, type) => {
    if (type === 'co2') {
      if (value > 450) return 'red';
      if (value > 350) return 'yellow';
      return 'green';
    }
    if (type === 'rainfall') {
      if (value > 10) return 'red';
      if (value >= 5) return 'yellow';
      return 'green';
    }
    if (type === 'pyrano') {
      if (value > 800) return 'red';
      if (value >= 400) return 'yellow';
      return 'green';
    }
    if (type === 'temperature') {
      if (value > 32) return 'red';
      if (value > 26) return 'yellow';
      return 'green';
    }
    if (type === 'humidity') {
      if (value > 80) return 'red';
      if (value > 50) return 'yellow';
      return 'green';
    }
    return 'gray';
  };

  return (
    <section id='dashboard' className='section'>
      <div className="dashboard-container">
        <div className="dashboard-header" data-aos="zoom-in" data-aos-delay="200" data-aos-easing="ease-in-out">
          <h2>Dashboard</h2>
        </div>

        {/* Tabel 1: Eddy Station Dashboard */}
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
              <td>Eddy Station Dashboard</td>
              <td>
                <button className="location-button" onClick={handleLocationClick}>Go to Location</button>
              </td>
              <td><span className="status">Active</span></td>
              <td>
                <button className="action-button" onClick={handleDashboardonClick}>Dashboard</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="space-between-tables"></div>

        {/* Tabel 2: Data Emisi dan Kondisi */}
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
                <span className={`indicator ${getStatusColor(carbonData?.co2, 'co2')}`}>
                  {carbonData ? (carbonData.co2 > 450 ? 'Tinggi' : carbonData.co2 > 350 ? 'Sedang' : 'Rendah') : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Curah Hujan</td>
              <td>{weatherData ? `${weatherData.rainfall} mm` : 'Loading...'}</td>
              <td>
                <span className={`indicator ${getStatusColor(weatherData?.rainfall, 'rainfall')}`}>
                  {weatherData ? (weatherData.rainfall > 10 ? 'Tinggi' : weatherData.rainfall >= 5 ? 'Sedang' : 'Rendah') : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Intensitas Matahari</td>
              <td>{weatherData ? `${weatherData.pyrano} W/m²` : 'Loading...'}</td>
              <td>
                <span className={`indicator ${getStatusColor(weatherData?.pyrano, 'pyrano')}`}>
                  {weatherData ? (weatherData.pyrano > 800 ? 'Tinggi' : weatherData.pyrano >= 400 ? 'Sedang' : 'Rendah') : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Temperature</td>
              <td>{weatherData ? `${weatherData.temperature.toFixed(2)} °C` : 'Loading...'}</td>
              <td>
                <span className={`indicator ${getStatusColor(weatherData?.temperature, 'temperature')}`}>
                  {weatherData ? (weatherData.temperature > 32 ? 'Tinggi' : weatherData.temperature > 26 ? 'Sedang' : 'Rendah') : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Humidity</td>
              <td>{weatherData ? `${weatherData.humidity}%` : 'Loading...'}</td>
              <td>
                <span className={`indicator ${getStatusColor(weatherData?.humidity, 'humidity')}`}>
                  {weatherData ? (weatherData.humidity > 80 ? 'Tinggi' : weatherData.humidity > 50 ? 'Sedang' : 'Rendah') : ''}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
