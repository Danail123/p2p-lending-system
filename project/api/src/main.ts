import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import helmet from 'helmet';
import { LendingSystemErrorFilter } from './middleware/filters/lending-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Lending System')
    .setDescription('Team Project')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new LendingSystemErrorFilter());
  // app.use(helmet());
  app.enableCors();
  await app.listen(app.get(ConfigService).port);
}

bootstrap();
