import type { AirQualityAlert } from '../../domain/alert.entity';

export function toAlertDto(a: AirQualityAlert) {
  return {
    id: a.id,
    regionCode: a.regionCode,
    city: a.city,
    timestamp: a.timestamp.toISOString(),
    aqi: a.aqi ?? null,
    category: a.category ?? null,
    dominantPollutant: a.dominantPollutant ?? null,
    pm25: a.pm25 ?? null,
    pm10: a.pm10 ?? null,
  };
}
