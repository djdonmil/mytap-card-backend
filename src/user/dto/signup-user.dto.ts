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

    @ApiPropertyOptional({
        description: `Enter Gender`,
        example: `Male`
    })
    gender: string;

}