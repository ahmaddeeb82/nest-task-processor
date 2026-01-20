export interface AirQualityAlert {
  id: string;
  regionCode: string;
  city: string;
  timestamp: Date;
  aqi?: number | null;
  category?: string | null;
  dominantPollutant?: string | null;
  pm25?: number | null;
  pm10?: number | null;
  createdAt: Date;
}
