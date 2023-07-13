import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = parseInt(process.env.PORT) || 3000;
const VERSION = process.env.VERSION || 'dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('TESTING');

  const config = new DocumentBuilder()
    .setTitle('Brewery Management System Api')
    .setDescription(
      'The api powering the Over The Air Brew brewery management system.',
    )
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
