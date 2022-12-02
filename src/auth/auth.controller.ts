/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Put, Query, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { MobileLoginDto } from './dto/mobile-login.dto';
import { Role } from 'src/shared/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { LogInUser } from 'src/shared/decorators/login.decorator';
import { User } from 'src/shared/entity/user.entity';
import { changePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetLinkDto } from './dto/reset-link.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { StatusFilter } from 'src/shared/interceptors/status_exception/status.filter';
import { StatusInterceptor } from 'src/shared/interceptors/status_exception/statusInterceptor.interceptor';
import { SiteUrl } from 'src/shared/decorators/siteUrl.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

	constructor(
		private authService: AuthService
	) { }


	@Post("login")
	@ApiOperation({ summary: "Login normal user" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 406, description: "Please Verify Your Email Id" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 401, description: "Invalid Login credentials." })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	// @HttpCode(200)
	@UseFilters(StatusFilter)
	@UseInterceptors(StatusInterceptor)
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	async signIn(
		@Body(ValidationPipe) authCredentialDto: LoginDto,
	) {
		const roles = [Role.SUPER_ADMIN];
		const result = await this.authService.loginUser(
			authCredentialDto,
			roles,
		);
		return result;
	}

	//@Post("admin-login")
	@ApiOperation({ summary: "Login admin user" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 406, description: "Please Verify Your Email Id" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 401, description: "Invalid Login credentials." })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@UseFilters(StatusFilter)
	@UseInterceptors(StatusInterceptor)
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	async adminSignIn(
		@Body(ValidationPipe) authCredentialDto: LoginDto,
	) {
		const roles = [Role.ADMIN, Role.SUPER_ADMIN];
		const result = await this.authService.loginUser(
			authCredentialDto,
			roles
		);
		return result;
	}


	//@Post('change-password')
	@ApiOperation({ summary: "Change password if user is login" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 406, description: "Please Verify Your Email Id" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 401, description: "Invalid Login credentials." })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	// @HttpCode(200)
	@UseFilters(StatusFilter)
	@UseInterceptors(StatusInterceptor)
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	async changePassword(
		@Body(ValidationPipe) changePasswordDto: changePasswordDto,
		@LogInUser() user: User
	) {
		return await this.authService.changePassword(changePasswordDto, user);
	}
}
