import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import './styles/index.css';
import './styles/futurecard.css'

function App() {
    const features = [
    { icon: '/assets/icon-visual.png', title: 'Visualisasi Data', desc: 'Menyajikan data dalam bentuk grafik dan chart yang informatif.' },
    { icon: '/assets/icon-monitor.png', title: 'Monitoring Realtime', desc: 'Pemantauan kondisi karbon secara langsung dari lapangan.' },
    { icon: '/assets/icon-download.png', title: 'Unduh Data', desc: 'Data pemantauan tersedia untuk diunduh kapan saja.' },
    { icon: '/assets/icon-ai.png', title: 'Prediksi Emisi Karbon', desc: 'Analisis tren untuk memprediksi emisi karbon berbasis AI.' }
  ];
  return (
    <>
      <Navbar />  {/* Navbar tetap ada */}
      <Hero imgSrc="/assets/hero.png" />
      <section>
        <h2 style={{color: '#2d8f3b', fontWeight: 'bold'} } data-aos="fade-right" data-aos-delay="100" data-aos-easing="ease-in-out">We Provide Awesome Features</h2>
        <div className="feature-cards" data-aos="zoom-in">
          {features.map((f, idx) => (
            <FeatureCard key={idx} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>
      <section id="dashboard">
        <Dashboard /> {/* Dashboard tampil di sini */}
      </section>
      <section id="about">
        <AboutUs /> {/* AboutUs tampil di sini */}
      </section>
      <section id="faq">
        <FAQ />  {/* FAQ tampil di sini */}
      </section>
      <Footer />  {/* Footer tetap ada di bawah */}
    </>
  );
}

export default App;
