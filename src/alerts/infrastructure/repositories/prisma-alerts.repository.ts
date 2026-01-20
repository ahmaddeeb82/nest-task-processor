import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { AlertsRepositoryPort } from '../../application/ports/alerts.repository.port';
import type { AirQualityAlert } from '../../domain/alert.entity';

@Injectable()
export class PrismaAlertsRepository implements AlertsRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<AirQualityAlert, 'id' | 'createdAt'>): Promise<void> {
    await this.prisma.airQualityAlert.create({
      data: {
        regionCode: data.regionCode,
        city: data.city,
        timestamp: data.timestamp,
        aqi: data.aqi ?? null,
        category: data.category ?? null,
        dominantPollutant: data.dominantPollutant ?? null,
        pm25: data.pm25 ?? null,
        pm10: data.pm10 ?? null,
      },
    });
  }

  async listLatest(limit: number): Promise<AirQualityAlert[]> {
    return this.prisma.airQualityAlert.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }
}
