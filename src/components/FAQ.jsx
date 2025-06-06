// src/pages/FAQ.jsx
import React from 'react';
import FAQItem from '../components/FAQItem';
import '../styles/faq.css';

const faqData = [
  {
    question: 'Apa tujuan dari dashboard ini?',
    answer: 'Dashboard ini digunakan untuk memantau secara real-time data emisi karbon di area perkebunan kelapa sawit, serta memberikan prediksi berbasis machine learning untuk mendukung pengambilan keputusan yang ramah lingkungan.',
  },
  {
    question: 'Dari mana asal data yang ditampilkan di dashboard?',
    answer: 'Data berasal dari sensor emisi karbon yang dipasang di lapangan dan dikirimkan melalui jaringan IoT ke sistem pusat.',
  },
  {
    question: 'Seberapa sering data diperbarui?',
    answer: 'Data diperbarui setiap detik secara otomatis.',
  },
  {
    question: 'Data apa saja yang ditampilkan di dashboard?',
    answer: 'Dashboard menampilkan data aktual dan prediksi karbon dioksida, suhu, kelembaban, dan parameter lainnya dari area pemantauan.',
  },
  {
    question: 'Bisakah saya mengunduh data dari dashboard?',
    answer: 'Ya, data dapat diunduh dalam format CSV dari halaman dashboard.',
  },
];

const FAQ = () => {
  return (
    <section id='faq' className="faq-section">
      <h2 data-aos="zoom-in-down" data-aos-delay="100" data-aos-easing="ease-in-out">Frequently Ask Questions</h2>
      <div className="faq-grid" data-aos="zoom-out-up" data-aos-delay="300"  data-aos-easing="ease-out-cubic">
        {faqData.map((item, idx) => (
          <FAQItem key={idx} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
