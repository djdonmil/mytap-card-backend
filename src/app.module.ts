import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';

// const mailConfig = config.get('email');

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    // MailerModule.forRoot({
    //   transport: {
    //     host: mailConfig.host,
    //     port: mailConfig.port,
    //     ignoreTLS: true,
    //     secure: mailConfig.secure,
    //     auth: {
    //       user: mailConfig.user,
    //       pass: mailConfig.pass
    //     }
    //   },
    //   defaults: {
    //     from: `"Apple & More" <${mailConfig.user}>`,
    //   },
    //   template: {
    //     dir: 'src/shared/email_templates',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
