export interface Village {
  id: string;
  name: string;
  district: string;
  state: string;
  pincode: string;
  population: number;
  total_area: number;
  agricultural_area: number;
  created_at: string;
  updated_at: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  village_id: string;
  land_area: number;
  farmer_type: 'small' | 'medium' | 'large';
  created_at: string;
  updated_at: string;
  village?: Village;
}

export interface Crop {
  id: string;
  name: string;
  category: string;
  season: 'kharif' | 'rabi' | 'zaid';
  duration_days: number;
  water_requirement: string;
  soil_type: string;
  created_at: string;
}

export interface CropRecord {
  id: string;
  farmer_id: string;
  crop_id: string;
  village_id: string;
  area_planted: number;
  planting_date: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  yield_quantity?: number;
  yield_quality?: 'excellent' | 'good' | 'average' | 'poor';
  market_price?: number;
  total_income?: number;
  expenses: number;
  profit?: number;
  status: 'planted' | 'growing' | 'harvested' | 'sold';
  notes?: string;
  created_at: string;
  updated_at: string;
  farmer?: Farmer;
  crop?: Crop;
  village?: Village;
}

export interface WeatherData {
  id: string;
  village_id: string;
  date: string;
  temperature_max: number;
  temperature_min: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  weather_condition: string;
  created_at: string;
  village?: Village;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'officer' | 'farmer';
  name: string;
  created_at: string;
}