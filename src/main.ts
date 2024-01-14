import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from '@filters/unauthorized_exception';
import { HttpExceptionFilter } from '@filters/http_exception';
import { InternalServerErrorExceptionFilter,  } from '@filters/internal_server_exception';
import { NotFoundExceptionFilter } from '@filters/not_found_exception';

import { VersioningType } from '@nestjs/common';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new InternalServerErrorExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(helmet());

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI
  })

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
