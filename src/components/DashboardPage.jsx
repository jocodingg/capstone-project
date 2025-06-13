import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/dashboardpage.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const [carbonHistory, setCarbonHistory] = useState([]);
  const [carbonPredict, setCarbonPredict] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchCarbon = async () => {
      try {
        const res = await axios.get("https://backend-express-production-1aad.up.railway.app/api/carbon/db/simulate");
        const newData = res.data;
        setCarbonHistory(prev => [...prev, newData].slice(-10));
        setLastUpdate(newData.timestamp);
      } catch (error) {
        console.error("Error fetching carbon:", error);
      }
    };

    const fetchCarbonPredict = async () => {
      try {
        const res = await axios.get("https://backend-express-production-1aad.up.railway.app/api/carbon-predict/db");
        const sorted = res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const latest = sorted[0];
        setCarbonPredict(latest);
      } catch (error) {
        console.error("Error fetching carbon predict:", error);
      }
    };

    const fetchWeather = async () => {
      try {
        const res = await axios.get("https://backend-express-production-1aad.up.railway.app/api/microclimate/db/simulate");
        const newData = res.data;
        setWeatherHistory(prev => [...prev, newData].slice(-10));
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchCarbon();
    fetchCarbonPredict();
    fetchWeather();

    const intervalCarbon = setInterval(fetchCarbon, 60000);
    const intervalPredict = setInterval(fetchCarbonPredict, 60000);
    const intervalWeather = setInterval(fetchWeather, 60000);

    return () => {
      clearInterval(intervalCarbon);
      clearInterval(intervalPredict);
      clearInterval(intervalWeather);
    };
  }, []);

  const renderGauge = (label, value, unit, thresholds = {}) => {
    let statusClass = "gauge-default";
    if (thresholds.high !== undefined && value > thresholds.high) statusClass = "gauge-high";
    else if (thresholds.low !== undefined && value < thresholds.low) statusClass = "gauge-low";
    else statusClass = "gauge-medium";

    return (
      <div className="gauge-wrapper">
        <div className={`gauge-circle ${statusClass}`}>
          {value} {unit}
        </div>
        <span className="gauge-label">{label}</span>
      </div>
    );
  };

  const latestCarbon = carbonHistory[carbonHistory.length - 1];
  const latestWeather = weatherHistory[weatherHistory.length - 1];

  return (
    <div className="dashboardpage-container">
       <aside className="hidden md:flex flex-col w-64 bg-white shadow-md dashboardpage-sidebar">
        <div className="sidebar-logo-wrapper">
          <img src="/assets/Logo.png" alt="Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">Eddy Station</h2>
        <nav className="flex-1">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link sidebar-active" : "sidebar-link"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/download" className={({ isActive }) => isActive ? "sidebar-link sidebar-active" : "sidebar-link"}>
                Download Data
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/" className="sidebar-link">
            Back to Home
          </NavLink>
        </div>
      </aside>

      {/* Navbar Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-2 md:hidden z-50">
        <NavLink to="/" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4H9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V9.75z" />
          </svg>
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/dashboard" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          <span className="text-xs">Dashboard</span>
        </NavLink>
        <NavLink to="/download" className="flex flex-col items-center text-sm">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m-6-5V4h6v4" />
          </svg>
          <span className="text-xs">Download</span>
        </NavLink>
      </nav>

      {/* Main Content */}
      <main className="dashboardpage-main">
        <h1 className="dashboardpage-header">Dashboard</h1>

        {lastUpdate && (
          <p className="text-sm text-gray-500 mb-4">
            Last update: {new Date(lastUpdate).toLocaleString("id-ID", {
              day: "2-digit", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit", second: "2-digit",
              hour12: false, timeZone: "Asia/Jakarta"
            })}
          </p>
        )}

        {/* CHART SECTION */}
        <section className="dashboardpage-charts">
          {/* Weather Chart */}
          {weatherHistory.length > 0 && (
            <div className="chart-box">
              <h3>Cuaca - Temperatur</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weatherHistory.map(d => ({
                    name: new Date(d.timestamp).toUTCString().split(" ")[4],
                    suhu: d.temperature,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="suhu" stroke="#FF8C00" name="Suhu (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {weatherHistory.length > 0 && (
            <div className="chart-box">
              <h3>Cuaca - Intensitas Matahari</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weatherHistory.map(d => ({
                    name: new Date(d.timestamp).toUTCString().split(" ")[4],
                    intensitas: d.pyrano,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="intensitas" stroke="#FFD700" name="Matahari (W/m²)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {weatherHistory.length > 0 && (
            <div className="chart-box">
              <h3>Cuaca - Curah Hujan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weatherHistory.map(d => ({
                    name: new Date(d.timestamp).toUTCString().split(" ")[4],
                    curah_hujan: d.rainfall
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="curah_hujan" stroke="#1E90FF" name="Curah Hujan (mm)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {weatherHistory.length > 0 && (
            <div className="chart-box">
              <h3>Cuaca - Kelembapan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weatherHistory.map(d => ({
                    name: new Date(d.timestamp).toUTCString().split(" ")[4],
                    kelembapan: d.humidity,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="kelembapan" stroke="#32CD32" name="Kelembapan (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {/* CO₂ Actual Chart */}
          {carbonHistory.length > 0 && (
            <div className="chart-box">
              <h3>CO₂ - Actual</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={carbonHistory.map(d => ({
                    name: new Date(d.timestamp).toLocaleTimeString("id-ID", {
                      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
                    }),
                    co2: d.co2
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="co2" stroke="#FF0000" name="CO₂" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* CO₂ Predict Chart */}
          {carbonPredict && (
            <div className="chart-box">
              <h3>CO₂ - Predict</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[carbonPredict].map(d => ({
                  name: new Date(d.timestamp).toUTCString().split(" ")[4],
                    co2: d.co2
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="co2" stroke="#00BFFF" name="Prediksi CO₂" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* GAUGES */}
        <section className="dashboardpage-gauges">
          {latestCarbon && renderGauge("CO₂", latestCarbon.co2, "PPM", { low: 400, high: 600 })}
          {latestWeather && (
            <>
              {renderGauge("Temperatur", latestWeather.temperature, "°C", { low: 26, high: 40 })}
              {renderGauge("Intensitas Matahari", latestWeather.pyrano, "W/m²", { low: 400, high: 900 })}
              {renderGauge("Kelembapan", latestWeather.humidity, "%", { low: 70, high: 90 })}
              {renderGauge("Curah Hujan", latestWeather.rainfall, "mm", { low: 20, high: 50 })}
            </>
          )}
        </section>

        {/* TABLE */}
        <section className="dashboardpage-table">
          <h3>Status Sensor</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>CO₂</th>
                <th>Suhu</th>
                <th>Matahari</th>
                <th>Kelembapan</th>
                <th>Curah Hujan</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => {
                const carbon = carbonHistory[carbonHistory.length - 1 - i];
                const weather = weatherHistory[weatherHistory.length - 1 - i];
                if (!carbon && !weather) return null;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{carbon?.co2 ?? "-"}</td>
                    <td>{weather?.temperature ?? "-"}</td>
                    <td>{weather?.pyrano ?? "-"}</td>
                    <td>{weather?.humidity ?? "-"}</td>
                    <td>{weather?.rainfall ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
