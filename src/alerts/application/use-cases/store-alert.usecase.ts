import { Injectable } from '@nestjs/common';
import type { AlertsRepositoryPort } from '../ports/alerts.repository.port';

export interface IncomingCriticalAlertEvent {
  regionCode: string;
  city: string;
  timestamp: string; // ISO
  aqi: number | null;
  category: string | null;
  dominantPollutant: string | null;
  pm25: number | null;
  pm10: number | null;
}

@Injectable()
export class StoreAlertUseCase {
  constructor(private readonly repo: AlertsRepositoryPort) {}

  async execute(event: IncomingCriticalAlertEvent): Promise<void> {
    await this.repo.create({
      regionCode: event.regionCode,
      city: event.city,
      timestamp: new Date(event.timestamp),
      aqi: event.aqi,
      category: event.category,
      dominantPollutant: event.dominantPollutant,
      pm25: event.pm25,
      pm10: event.pm10,
    });
  }
}
