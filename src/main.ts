import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './infraestructure/filters/exceptionsFilter';
import { ErrorCodeEnum } from './domain/enums/errorCode.enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException({
          httpStatus: 400,
          errorCode: ErrorCodeEnum.ValidationError,
          validationErrors: errors.map((i) =>
            Object.values(i.constraints).join(', '),
          ),
        }),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Taxi24 QIK')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
