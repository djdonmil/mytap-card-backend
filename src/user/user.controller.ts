/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, ValidationPipe, Put, Param, UseGuards, Get, Patch, BadRequestException, Query, HttpCode, UseInterceptors, UploadedFiles, Req, UseFilters, Delete } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/edit_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.dacorator';
import { AddUserDto } from './dto/add_user.dto';
import { StatusChangeDto } from './dto/status_change.dto';
import { PageQueryDto } from 'src/shared/dtos/list_query.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/image_upload.dto';
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from 'src/shared/helper/file_validators';
import { ImageDto } from './dto/image.dto';
import { StatusInterceptor } from 'src/shared/interceptors/status_exception/statusInterceptor.interceptor';
import { StatusFilter } from 'src/shared/interceptors/status_exception/status.filter';
import { CompleteSetupDto } from './dto/complete_user_setup.dto';
import { EditDefaultTimeSlotDto } from './dto/edit-default-timeslot.dto';
import { UpdateEmailDto } from './dto/edit_email.dto';
import { User } from 'src/shared/entity/user.entity';
import { UserSettingsDto } from './dto/user_settings.dto';
import { EditUserAdminDto } from './dto/edit_user_admin.dto';
import { UserPlanStatusDto } from './dto/user_plan_status.dto';
import { SiteUrl } from 'src/shared/decorators/siteUrl.decorator';
import { UserQrDto } from './dto/user_qr_dto';
import { UserThingDto } from './dto/user_thing_dto';
import { UserPreviewColour } from './dto/user_preview_color.dto';
import { UserTimezoneDto } from './dto/user_timezone.dto';

@Controller('user')
@ApiTags('User')
export class UserController {

	constructor(
		private userService: UserService
	) { }

	@Post("/add")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Add New User" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@UseFilters(StatusFilter)
	@UseInterceptors(StatusInterceptor)
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	async addUser(
		@Body() createUser: AddUserDto,
		@GetUser() user
	) {
		return await this.userService.addUser(createUser, user.id);
	}


	//	@Post("/signup")
	@ApiOperation({ summary: "Signup user" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@UseFilters(StatusFilter)
	@UseInterceptors(StatusInterceptor)
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	async signUp(@Body(ValidationPipe) createUser: CreateUserDto) {
		return await this.userService.SignUp(createUser);
	}

	@Get("/:id")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get user details" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	getUser(
		@Param('id') id: string, @SiteUrl() siteUrl: String
	) {
		return this.userService.getUser(id, siteUrl);
	}

	// @Put("profile/edit")
	// @UseGuards(AuthGuard('jwt'))
	// @ApiBearerAuth()
	// @ApiConsumes("multipart/form-data")
	// @ApiOperation({ summary: "Edit personal profile details" })
	// @ApiResponse({ status: 200, description: "Api success" })
	// @ApiResponse({ status: 422, description: "Bad Request or API error message" })
	// @ApiResponse({ status: 404, description: "Not found!" })
	// @ApiResponse({ status: 409, description: "User Already Exist" })
	// @ApiResponse({ status: 500, description: "Internal server error!" })
	// @ApiHeader({
	//     name: 'language',
	//     description: 'Enter language code(ex. en)',
	//     example: 'en'
	// })
	// @UseInterceptors(
	// 	FileFieldsInterceptor(
	// 		[
	// 			{ name: "profilePic" },
	// 		],
	// 		{
	// 			storage: diskStorage({
	//                 destination: `./assets/profile-pic`,
	// 				filename: editFileName,
	// 			}),
	// 			fileFilter: imageFileFilter,
	// 		},
	// 	),
	// )
	// editUser(
	// 	@Body(ValidationPipe) updateUser: UpdateUserDto,
	// 	@GetUser() user,
	// 	@UploadedFiles() fileDto: FileDto,
	// 	@Req() req
	// ) {		
	// 	return this.userService.editUser(updateUser, user, fileDto);
	// }
	@Put("/edit")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Edit user details" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	editUser(
		@Body(ValidationPipe) updateUser: UpdateUserDto,
		@GetUser() user,
	) {
		return this.userService.editUser(updateUser, user);
	}

	//	@Get("profile/get-details")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get user profile details" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	getUserProfile(
		@GetUser() user, @SiteUrl() siteUrl: String
	) {
		return this.userService.getUser(user.id, siteUrl);
	}


	@Get("/")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get user list" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	getUserList(
		@Query() query: PageQueryDto,
	) {
		console.log("======= listData ====", query);
		return this.userService.getUserList(query);
	}

	//	@Get("/static-urls/list")
	@ApiOperation({ summary: "Get list of static links" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	getStaticLinks() {
		return this.userService.getStaticLinks();
	}

}
