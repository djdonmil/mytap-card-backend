import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express";
import * as http from "http";
import * as config from "config";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { BadRequestExceptionFilter } from 'bad-request-exception.filter';
import { ConflictExcepionFilter } from 'conflict-exception.filter';
import { NotFoundExceptionFilter } from 'not-found-exception.filter';
import { UnauthorizedExceptionFilter } from 'unauthorized-exception.filter';
import { InternalServerErrorExceptionFilter } from 'internal-server-exception.filter';
import { ForbiddenExceptionFilter } from 'forbidden-resources-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotAcceptableExceptionFilter } from 'not-acceptable-exception.filter';
import * as path from "path";


async function bootstrap() {

  const serverConfig = config.get('server');

  const server = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server)
  );

  app.setGlobalPrefix("v1");
	app.useGlobalFilters(new BadRequestExceptionFilter());
	app.useGlobalFilters(new ConflictExcepionFilter());
	app.useGlobalFilters(new NotFoundExceptionFilter());
	app.useGlobalFilters(new UnauthorizedExceptionFilter());
	app.useGlobalFilters(new InternalServerErrorExceptionFilter());
	app.useGlobalFilters(new ForbiddenExceptionFilter());
	app.useGlobalFilters(new NotAcceptableExceptionFilter());
	app.useGlobalPipes(new ValidationPipe());
  
  

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Apple & More")
    .setDescription("")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("api-docs", app, document);
  app.enableCors();

  app.useStaticAssets(path.join(__dirname, "../../assets"));
  await app.init();

  //listening req. on http port
  const port = process.env.PORT || serverConfig.port;
  http.createServer(server).listen(port);

}

bootstrap();
