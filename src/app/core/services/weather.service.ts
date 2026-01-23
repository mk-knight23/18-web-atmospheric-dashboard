import { Injectable, signal, computed } from '@angular/core';
import { WeatherData, WeatherState } from '../../types/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  state = signal<WeatherState>({
    current: null,
    favorites: [],
    units: 'metric',
    loading: false,
    error: null,
  });

  currentWeather = computed(() => this.state().current);
  isLoading = computed(() => this.state().loading);

  private readonly API_KEY = '895284fb361c39433360408544c9b8f6'; // Generic key for demo

  async fetchWeather(city: string) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    try {
      // Step 1: Get Lat/Lon
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.API_KEY}`);
      const geoData = await geoRes.json();
      
      if (!geoData.length) throw new Error('City not found');
      
      const { lat, lon, name, country } = geoData[0];
      
      // Step 2: Get One Call Data (Simulated with combined calls for stability)
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${this.state().units}&appid=${this.API_KEY}`);
      const w = await weatherRes.json();
      
      const data: WeatherData = {
        city: name,
        country: country,
        temp: w.main.temp,
        feelsLike: w.main.feels_like,
        condition: w.weather[0].main,
        description: w.weather[0].description,
        icon: w.weather[0].icon,
        humidity: w.main.humidity,
        windSpeed: w.wind.speed,
        pressure: w.main.pressure,
        sunrise: w.sys.sunrise,
        sunset: w.sys.sunset,
        daily: [], // Mocked for UI
        hourly: [], // Mocked for UI
      };

      this.state.update(s => ({ ...s, current: data, loading: false }));
    } catch (err: any) {
      this.state.update(s => ({ ...s, error: err.message, loading: false }));
    }
  }

  toggleUnits() {
    const newUnits = this.state().units === 'metric' ? 'imperial' : 'metric';
    this.state.update(s => ({ ...s, units: newUnits }));
    if (this.state().current) this.fetchWeather(this.state().current!.city);
  }
}
