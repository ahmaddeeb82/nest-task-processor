import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const rabbitUrl = config.get<string>('RABBITMQ_URL') ?? 'amqp://guest:guest@localhost:5672';

  // RMQ consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'critical-air-quality-alerts',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  const port = parseInt(process.env.PROCESSOR_PORT ?? '3000', 10);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
