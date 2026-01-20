import { Injectable } from '@nestjs/common';
import type { AlertsRepositoryPort } from '../ports/alerts.repository.port';

@Injectable()
export class ListAlertsUseCase {
  constructor(private readonly repo: AlertsRepositoryPort) {}

  async execute(limit = 20) {
    return this.repo.listLatest(limit);
  }
}
