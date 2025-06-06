import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarbonPrediction from './CarbonPrediction';  // Mengimpor komponen CarbonPrediction

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari backend Express.js
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carbon/raw');
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard Page</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Nilai</th>
            <th>Indikator</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData && dashboardData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>
                <span className={`indicator ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menambahkan CarbonPrediction di halaman Dashboard */}
      <div className="carbon-prediction">
        <CarbonPrediction /> {/* Menambahkan komponen CarbonPrediction di sini */}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Tinggi':
      return 'red';
    case 'Sedang':
      return 'yellow';
    case 'Rendah':
      return 'green';
    default:
      return 'gray';
  }
};

export default DashboardPage;
