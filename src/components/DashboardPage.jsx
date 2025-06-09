import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/dashboardpage.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [carbonRaw, setCarbonRaw] = useState([]);
  const [carbonPredict, setCarbonPredict] = useState([]);
  const [weatherRaw, setWeatherRaw] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carbonRawRes, carbonPredictRes, weatherRes] = await Promise.all([
          axios.get("https://backend-express-production-1aad.up.railway.app/api/carbon/db"),
          axios.get("http://localhost:5000/api/carbon/predict"),
          axios.get("https://backend-express-production-1aad.up.railway.app/api/microclimate/db")
        ]);

        setCarbonRaw(carbonRawRes.data);
        setCarbonPredict(carbonPredictRes.data);
        setWeatherRaw(weatherRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
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

  return (
    <div className="dashboardpage-container">
      <aside className="dashboardpage-sidebar">
        <div className="sidebar-logo-wrapper">
          <img src="/assets/Logo.png" alt="Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">Eddy Station</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-active' : 'sidebar-link'
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/download"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-active' : 'sidebar-link'
                }
              >
                Download Data
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-active' : 'sidebar-link'
                }
              >
                Back to Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboardpage-main">
        <h1 className="dashboardpage-header">Dashboard</h1>
        <section className="dashboardpage-charts">
          <div className="chart-box">
            <h3 className="chart-title">Prediction & Actual Data (CO2)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonRaw.map((raw, i) => ({
                name: new Date(raw.timestamp).toLocaleTimeString(),
                actual: raw.co2,
                predict: carbonPredict[i]?.co2 ?? null
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "PPM", angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" name="CO2 Actual" />
                <Line type="monotone" dataKey="predict" stroke="#82ca9d" name="CO2 Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3 className="chart-title">Actual Data - CO2 & Climate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonRaw.map((raw, i) => ({
                name: new Date(raw.timestamp).toLocaleTimeString(),
                co2: raw.co2,
                suhu: weatherRaw[i]?.temperature,
                intensitas: weatherRaw[i]?.pyrano,
                kelembapan: weatherRaw[i]?.humidity,
                curah_hujan: weatherRaw[i]?.rainfall,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="co2" stroke="#ff7300" name="CO2" />
                <Line type="monotone" dataKey="suhu" stroke="#387908" name="Suhu (°C)" />
                <Line type="monotone" dataKey="intensitas" stroke="#8884d8" name="Intensitas (W/m2)" />
                <Line type="monotone" dataKey="kelembapan" stroke="#00C49F" name="Kelembapan (%)" />
                <Line type="monotone" dataKey="curah_hujan" stroke="#0088FE" name="Curah Hujan (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboardpage-gauges">
          {renderGauge("CO2", carbonRaw.at(-1)?.co2 || 0, "PPM", { low: 400, high: 1000 })}
          {renderGauge("Temperature", weatherRaw.at(-1)?.temperature || 0, "°C", { low: 10, high: 35 })}
          {renderGauge("Intensitas Matahari", weatherRaw.at(-1)?.pyrano || 0, "W/m2", { low: 300, high: 1200 })}
          {renderGauge("Kelembapan", weatherRaw.at(-1)?.humidity || 0, "RH", { low: 30, high: 80 })}
          {renderGauge("Curah Hujan", weatherRaw.at(-1)?.rainfall || 0, "mm", { low: 10, high: 400 })}
        </section>

        <section className="dashboardpage-table">
          <h3 className="table-title">Table Status</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>CO2</th>
                <th>Suhu</th>
                <th>Intensitas Matahari</th>
                <th>Kelembapan</th>
                <th>Curah Hujan</th>
              </tr>
            </thead>
            <tbody>
              {carbonRaw.slice(-10).reverse().map((data, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.co2}</td>
                  <td>{weatherRaw[i]?.temperature || "-"}</td>
                  <td>{weatherRaw[i]?.pyrano || "-"}</td>
                  <td>{weatherRaw[i]?.humidity || "-"}</td>
                  <td>{weatherRaw[i]?.rainfall || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
