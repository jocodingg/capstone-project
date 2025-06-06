// src/CarbonPrediction.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarbonPrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    feature1: '',
    feature2: ''
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mengirim data ke backend untuk prediksi
      const response = await axios.post('http://localhost:5000/api/carbon/predict', inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Carbon Emission Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="feature1"
          placeholder="Feature 1"
          value={inputData.feature1}
          onChange={handleChange}
        />
        <input
          type="number"
          name="feature2"
          placeholder="Feature 2"
          value={inputData.feature2}
          onChange={handleChange}
        />
        <button type="submit">{loading ? "Predicting..." : "Get Prediction"}</button>
      </form>

      {prediction && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default CarbonPrediction;
