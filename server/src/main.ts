import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO we should configure this once we go to production
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.enableShutdownHooks();
  // TODO enable this when we go to production
  // app.useGlobalGuards(
  //   new IPAllowlistGuard(app.get(IPService), new Reflector()),
  // );
  await app.listen(3001);
}
bootstrap();
