import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'; 

const Dashboard = () => {
  const navigate = useNavigate(); // inisialisasi navigator

  const handleLocationClick = () => {
    navigate('/lokasi');
  };

  const handleDashboardonClick = () => {
    navigate('/dashboard');
  };
  // Data pertama (Eddy Station Dashboard)
  const data1 = [
    { id: 1, name: 'Eddy Station Dashboard', location: 'Go to Location', status: 'Active' },
  ];

  // Data kedua (Emisi dan Kondisi)
  const data2 = [
    { id: 1, name: 'Karbon Dioksida (CO₂)', value: '500 ppm', status: 'Tinggi' },
    { id: 2, name: 'Curah Hujan', value: '200 mm', status: 'Rendah' },
    { id: 3, name: 'Intensitas Matahari', value: '67 W/m²', status: 'Sedang' },
    { id: 4, name: 'Temperature', value: '33°C', status: 'Rendah' },
    { id: 5, name: 'Humidity', value: '40%', status: 'Tinggi' },
  ];

  // Fungsi untuk menentukan warna berdasarkan status
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

  return (
  <section id='dashboard' className='section'>
    <div className="dashboard-container">
        <div className="dashboard-header" data-aos="zoom-in" data-aos-delay="200" data-aos-easing="ease-in-out">
            <h2>Dashboard</h2>
        </div>
      {/* Tabel 1: Eddy Station Dashboard */}
      <table className="dashboard-table" data-aos="zoom-in" data-aos-delay="300"  data-aos-easing="ease-out-cubic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td><button className="location-button" onClick={handleLocationClick}>{item.location}</button></td>
              <td><span className="status">{item.status}</span></td>
              <td><button className="action-button" onClick={handleDashboardonClick}>Dashboard</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Memberikan jarak antar tabel */}
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
          {data2.map((item) => (
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
    </div>
  </section>
  );
};

export default Dashboard;