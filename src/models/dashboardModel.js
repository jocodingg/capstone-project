import axios from 'axios';

export class DashboardModel {
  static async fetchCarbonData() {
    const response = await axios.get('https://backend-express-production-1aad.up.railway.app/api/carbon/db/simulate');
    return response.data;
  }

  static async fetchWeatherData() {
    const response = await axios.get('https://backend-express-production-1aad.up.railway.app/api/microclimate/db/simulate');
    return response.data;
  }
};