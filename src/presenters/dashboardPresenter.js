import { DashboardModel } from '../models/dashboardModel';

export class DashboardPresenter {
  constructor(view) {
    this.view = view;
  }

  async loadCarbonData() {
    try {
      const carbonData = await DashboardModel.fetchCarbonData();
      this.view.updateCarbonData(carbonData);
    } catch (error) {
      console.error('Error loading CO₂ data:', error);
      this.view.updateCarbonData(null);
    }
  }

  async loadWeatherData() {
    try {
      const weatherData = await DashboardModel.fetchWeatherData();
      this.view.updateWeatherData(weatherData);
    } catch (error) {
      console.error('Error loading weather data:', error);
      this.view.updateWeatherData(null);
    }
  }

  loadAllData() {
    this.loadCarbonData();
    this.loadWeatherData();
  }
}
