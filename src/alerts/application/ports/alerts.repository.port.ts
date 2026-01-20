import type { AirQualityAlert } from '../../domain/alert.entity';

export interface AlertsRepositoryPort {
  create(data: Omit<AirQualityAlert, 'id' | 'createdAt'>): Promise<void>;
  listLatest(limit: number): Promise<AirQualityAlert[]>;
}
