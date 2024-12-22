import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import corsOptions from './config/cors.config';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 5000;
  const logger = new Logger('Bootstrap');
  app.enableCors(corsOptions);

  mongoose.connection.on('connected', () => {
    logger.log(`Connected to MongoDB`);
  });
  mongoose.connection.on('error', () => {
    logger.log(`Error connecting to MongoDB`);
  });

  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
