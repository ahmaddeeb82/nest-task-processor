import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StoreAlertUseCase } from '../../application/use-cases/store-alert.usecase';
import type { IncomingCriticalAlertEvent } from '../../application/use-cases/store-alert.usecase';

@Controller()
export class RabbitMqAlertsConsumer {
  constructor(private readonly storeAlert: StoreAlertUseCase) {}

  @EventPattern('air.quality.alert.critical')
  async handleCritical(@Payload() data: IncomingCriticalAlertEvent) {
    await this.storeAlert.execute(data);
  }
}
