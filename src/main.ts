import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  // HTML 페이지 렌더링을 위해 NestExpressApplication 타입으로 지정
  // https://docs.nestjs.com/techniques/mvc#template-rendering
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger 생성을 위한 Config 작성
  const config = new DocumentBuilder()
    .setTitle('Infograb_Test')
    .setDescription('Infograb 과제 전형 프로젝트')
    .setVersion('0.1')
    .addBearerAuth() // authorize를 추가
    .build();

  // Swagger auth 옵션 설정
  const customOption: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
    },
  };
  // document 생성
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOption);

  // login 시 HTML 페이지 리턴을 위해 추가
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');
  // CORS 설정
  app.enableCors();
  // cookie 사용 시 진행
  // app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
