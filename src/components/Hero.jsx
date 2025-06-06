import React from 'react';
import '../styles/hero.css';

export default function Hero({ imgSrc }) {
  return (
    <section id='home' className="hero">
      <div className="hero-text">
        <h1 className='animate__animated animate__fadeInDown'>Towards a Greener Future with Real-Time Carbon Insights</h1>
        <p className='animate__animated animate__fadeInUp'>Real-time carbon data from your plantation – visualized, analyzed, and optimized for action.</p>
        <a href="#dashboard" className="btn-primary animate__animated animate__fadeInUp">Go to dashboard</a>
      </div>
      <div className="hero-image animate__animated animate__fadeInRight">
        <img src={imgSrc} alt="Ilustrasi Pohon" />
      </div>
    </section>
  );
}