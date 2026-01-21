import type { AirQualityAlert } from '../../domain/alert.entity';

export function toAlertDto(a: AirQualityAlert) {
  return {
    city: a.city,
    aqi: a.aqi ?? null,
    category: a.category ?? null,
    timestamp: a.timestamp.toISOString(),
  };
}
