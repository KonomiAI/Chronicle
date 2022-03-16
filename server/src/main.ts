import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { IPAllowlistGuard } from './auth/ip.guard';
import { IPService } from './models/ip/ip.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO we should configure this once we go to production
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // TODO enable this when we go to production
  // app.useGlobalGuards(
  //   new IPAllowlistGuard(app.get(IPService), new Reflector()),
  // );
  await app.listen(3001);
}
bootstrap();
