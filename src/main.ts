import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from '@filters/unauthorized_exception';
import { HttpExceptionFilter } from '@filters/http_exception';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
