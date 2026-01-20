import { Module } from '@nestjs/common';

import { AlertsController } from './presentation/alerts.controller';
import { RabbitMqAlertsConsumer } from './infrastructure/messaging/rabbitmq-alerts.consumer';

import { PrismaAlertsRepository } from './infrastructure/repositories/prisma-alerts.repository';
import { StoreAlertUseCase } from './application/use-cases/store-alert.usecase';
import { ListAlertsUseCase } from './application/use-cases/list-alerts.usecase';

@Module({
  controllers: [AlertsController, RabbitMqAlertsConsumer],
  providers: [
    PrismaAlertsRepository,
    // bind port by class injection (we can keep it simple here)
    { provide: 'AlertsRepositoryPort', useExisting: PrismaAlertsRepository },

    {
      provide: StoreAlertUseCase,
      useFactory: (repo: any) => new StoreAlertUseCase(repo),
      inject: ['AlertsRepositoryPort'],
    },
    {
      provide: ListAlertsUseCase,
      useFactory: (repo: any) => new ListAlertsUseCase(repo),
      inject: ['AlertsRepositoryPort'],
    },
  ],
})
export class AlertsModule {}
