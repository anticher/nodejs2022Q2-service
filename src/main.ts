import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import getLogLevels from './logger/getLogLevels';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  process
    .on('unhandledRejection', (reason, promise) => {
      console.error(reason, 'Unhandled Rejection at Promise', promise);
    })
    .on('uncaughtException', (err) => {
      console.error(err, 'Uncaught Exception thrown');
    });
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(),
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
