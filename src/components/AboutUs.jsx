import React from 'react';
import '../styles/aboutus.css'


const AboutUs = () => {
  return (
    <section id='about' className="about-us">
      <h2 data-aos="zoom-in-down" data-aos-delay="100" data-aos-easing="ease-in-out" >About Us</h2>
      <div className="about-images">
        <img data-aos="zoom-in" data-aos-delay="100"  data-aos-easing="ease-out-cubic" src="/assets/image 2.png" alt="Image 1" />
        <img data-aos="zoom-in" data-aos-delay="300"  data-aos-easing="ease-out-cubic" src="/assets/IMG_20240923_160429.png" alt="Image 2" />
        <img data-aos="zoom-in" data-aos-delay="500"  data-aos-easing="ease-out-cubic" src="/assets/IMG_20240924_121533.png" alt="Image 3" />
        <img data-aos="zoom-in" data-aos-delay="700"  data-aos-easing="ease-out-cubic" src="/assets/IMG_20240924_114744.png" alt="Image 4" />
      </div>
      <p data-aos="zoom-in-up" data-aos-delay="500"  data-aos-easing="ease-out-cubic">
        D-ECS adalah sistem dashboard monitoring yang dirancang untuk memantau emisi karbon dan kondisi cuaca secara real-time di perkebunan kelapa sawit. Dengan mengintegrasikan teknologi Internet of Things (IoT), machine learning, dan visualisasi data, sistem ini mampu memprediksi emisi karbon berdasarkan data cuaca. D-ECS mendukung pengambilan keputusan yang lebih presisi bagi para pemangku kepentingan guna mewujudkan pertanian berkelanjutan dan ramah lingkungan.
      </p>
    </section>
  );
};

export default AboutUs;
