import { Controller, Get, Query } from '@nestjs/common';
import { ListAlertsUseCase } from '../application/use-cases/list-alerts.usecase';
import { toAlertDto } from './dtos/alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly listAlerts: ListAlertsUseCase) {}

  @Get()
  async list(@Query('limit') limit?: string) {
    const n = Math.min(Math.max(Number(limit ?? 20), 1), 100);
    const alerts = await this.listAlerts.execute(n);
    return alerts.map(toAlertDto);
  }
}
