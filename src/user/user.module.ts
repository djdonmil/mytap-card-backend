import { UserService } from './user.service';
import * as config from 'config';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const jwtConfig = config.get('jwt');

@Module({
    imports: [PassportModule.register({
        defaultStrategy: 'jwt'
    }),
    JwtModule.register({
        secret: jwtConfig.SecretKey,
        signOptions: {
            expiresIn: jwtConfig.ExpireIn
        }
    }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        JwtStrategy,
    ],
    exports:[
        JwtStrategy,
        PassportModule
    ]
})
export class UserModule { }
