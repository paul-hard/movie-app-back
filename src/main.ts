import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiePareser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: "http://localhost:4200/"
  });

  app.use(cookiePareser())
  await app.listen(3200);
}

bootstrap();
