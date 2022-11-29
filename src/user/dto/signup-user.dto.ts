import { IsNotEmpty, IsEmail, ValidationArguments, IsEnum, ValidateIf, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Role } from 'src/shared/enums/role.enum';
import { errorMessage } from 'src/config/common.config';


export class CreateUserDto {

    @IsNotEmpty({
        message: `Please enter first name.`
    })
    @ApiProperty({
        description: `Enter First Name`,
        example: `Jon`
    })
    first_name: string;

    @ApiPropertyOptional({
        description: `Enter Last Name`,
        example: `Doe`
    })
    last_name: string;

    @ValidateIf(o => o.email != '')
    @IsEmail(
        {},
        {
            message: (args: ValidationArguments) => {
                if (typeof args.value != "undefined" && args.value != "") {
                    return `Please enter valid email address.`;
                } else {
                    return `Please enter email address.`
                }
            }
        }
    )
    @IsNotEmpty({
        message: `Please enter email address.`
    })
    @ApiProperty({
        description: `Enter Email Id`,
        example: `admin@loba.com`
    })
    email: string;

    @IsNotEmpty({
        message: `Please enter password.`
    })
    @ApiProperty({
        description: `Enter password`,
        example: `Abc1!2@3#`
    })
    password: string;

    @IsNotEmpty({
        message: `Please enter role.&&&role`
    })
    @Type(() => Number)
    @IsEnum([Role.ADMIN, Role.SC_USER, Role.DEALER, Role.END_USER], {
        message: (args: ValidationArguments) => {
            if (typeof args.value == "undefined" || args.value == "") {
                return `Please enter role.&&&role`;
            } else {
                return `Enter valid role.&&&role&&&role`;
            }
        },
    })
    @ApiProperty({
        description: `Select user role`,
        example: 1
    })
    role: number

    @IsNotEmpty({
        message: `Please select to allow email updates or not&&&allow_email_updates.`
    })
    @ApiProperty({
        description: `Allow Email Updates`,
        example: `false`
    })
    allow_email_updates: boolean

    @IsNotEmpty({ message: `Please enter your device model.&&&device_model&&&${errorMessage}` })
    @ApiProperty({
        description: `Device Model`,
        example: 'RNE-L22',
    })
    device_model: string;

    @IsNotEmpty({ message: `Please enter your device token.&&&device_token&&&${errorMessage}` })
    @ApiProperty({
        description: `Device Token`,
        example: `123abc#$%456`,
    })
    device_token: string;

    @IsNotEmpty({ message: `Please enter your app version.&&&app_version&&&${errorMessage}` })
    @ApiProperty({
        description: `App Version`,
        example: `1.0`,
    })
    app_version: string;

    @IsNotEmpty({ message: `Please enter your os version. &&&os_version&&&${errorMessage}` })
    @ApiProperty({
        description: `OS Version`,
        example: `7.0`,
    })
    os_version: string;
}