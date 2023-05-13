import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

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
        AuthController,],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports:[
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule { }
