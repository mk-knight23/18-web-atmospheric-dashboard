export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export interface DailyForecast {
  date: number;
  temp: { min: number; max: number };
  condition: string;
  icon: string;
}

export interface HourlyForecast {
  time: number;
  temp: number;
  condition: string;
  icon: string;
}

export interface WeatherState {
  current: WeatherData | null;
  favorites: string[];
  units: 'metric' | 'imperial';
  loading: boolean;
  error: string | null;
}
