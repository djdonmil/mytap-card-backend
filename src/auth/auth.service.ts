/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as config from "config";
import { Otp } from 'src/shared/entity/otp.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { SendMailerUtility } from 'src/shared/utility/send_mailer.utility';
import { MobileLoginDto } from './dto/mobile-login.dto';
import * as md5 from "md5";
import { User } from 'src/shared/entity/user.entity';
import { In } from 'typeorm';
import { GenerateOtpNumber } from 'src/shared/utility/generate-otp.utility';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { changePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import crypto = require('crypto');
import { ResetPasswordToken } from 'src/shared/entity/reset-password-token.entity';
import { ResetLinkDto } from './dto/reset-link.dto';
import { ResetTokenRepository } from './reset-token.repository';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForceUpdateDto } from './dto/force-update.dto';

@Injectable()
export class AuthService {

    isOtpEnabled;
    otpExpireTime;
    resetLinkExpireTime;

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ResetTokenRepository)
        private resetTokenRepository: ResetTokenRepository,
        private jwtService: JwtService,
        // private mailerService: MailerService,

    ) {
        let otpConfig = config.get('otp');
        this.isOtpEnabled = otpConfig.enabled;
        this.otpExpireTime = otpConfig.expireTime;
        this.resetLinkExpireTime = otpConfig.resetLinkExpireTime;
    }


    /**
     * 
     * @param loginUser 
     * @returns 
     * Login user with email and password with otp and with out otp based on set config otp value
     */
    async loginUser(loginUser: LoginDto, roles): Promise<{ access_token: string, user: User, message: string }> {

        const {
            email,
            password
        } = loginUser;

        const user = await this.userRepository.findOne({
            where: {
                email,
                roleId: In(roles),
                isActive: true,
                isDelete: false
            },
        });

        if (!user) {
            throw new NotFoundException(`USER_NOT_FOUND`)
        }

        if (await user.validatePassword(password)) {

            const token = this.generateJWTToken(user);

            delete user.password
            delete user.salt
            return {
                access_token: token,
                user,
                message: "You have logged in successfully."
            };

        } else {
            throw new UnauthorizedException(`Incorrect credentials.`);
        }
    }



    /**
     * Change password if user is login
     */
    async changePassword(changePasswordDto: changePasswordDto, user) {
        const { old_password, new_password } = changePasswordDto;

        let userId = user.id;
        const findUser = await this.userRepository.findOne({ id: userId });

        let hashPassword = await bcrypt.hash(old_password, findUser.salt)

        if (hashPassword == findUser.password) {
            const salt = await bcrypt.genSalt();
            findUser.password = await bcrypt.hash(new_password, salt);
            findUser.salt = salt;

            await findUser.save();

        } else {
            throw new NotAcceptableException("NOT_MATCH_PASSWORD")
        }


        return {
            message: "Your password had been changed successfully."
        }

    }

    /**
     * 
     * @param user 
     * @returns 
     * Generate JWT token with user payload
     */
    generateJWTToken(user) {
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            username: user.firstName + " " + user.lastName,
            firstName: user.firstName,
            phone: user.phoneNo,
            lastName: user.lastName,
            salt: user.salt,
            roleId: user.roleId,
        };

        const accessToken = this.jwtService.sign(payload);
        const token = accessToken;

        return token;
    }

}
