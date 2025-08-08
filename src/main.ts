import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, NestMicroservice, Transport } from '@nestjs/microservices';
import { environments } from './config/environments';

async function bootstrap() {
  const logger = new Logger('Notes-Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: environments.natsServer,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  await app.listen();
  logger.log(`Notes-Microservice is running on ${environments.natsServer}`);

}
bootstrap();
