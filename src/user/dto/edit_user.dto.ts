import { IsNotEmpty, IsEmail, ValidationArguments, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {

    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter userId`,
        example: ``
    })
    userId: string;

    @IsOptional()
    @ApiPropertyOptional({
        description: `Enter First Name`,
        example: `Jon`
    })
    first_name: string;

    @IsOptional()
    @ApiPropertyOptional({
        description: `Enter Last Name`,
        example: `Doe`
    })
    last_name: string;

    @IsOptional()
    @ApiPropertyOptional({
        description: `Enter age`,
        example: `23`
    })
    age: number;

    @IsEmail(
        {},
        {
            message: (args: ValidationArguments) => {
                if (typeof args.value == "undefined" || args.value == "") {
                    return `Please enter email address.&&&email`;
                } else {
                    return `Please Enter valid email address.&&&email`;
                }
            },
        },
    )
    @ApiProperty({
        description: `Enter Email Id`,
        example: `jon.doe@gmail.com`
    })
    email: string;


    @IsOptional()
    @ApiPropertyOptional({
        description: `Enter gender`,
        example: `Male/Female`
    })
    gender: string;

    // @IsNotEmpty({
    //     message: `Please enter plan Id`
    // })
    // @ApiProperty({
    //     description: `Enter plan Id`,
    //     example: `1`
    // })
    // plan_id: number;

    // @IsNotEmpty({
    //     message: `Please enter account status`
    // })
    // @ApiProperty({
    //     description: `Enter account status`,
    //     example: true
    // })
    // is_active: boolean;

    // @IsNotEmpty({
    //     message: `Please enter your contact number.&&&phone_no`
    // })
    // @ApiProperty({
    //     description: `Enter phone number`,
    //     example: `8452456712`
    // })
    // phone_no: string;

    @IsOptional()
	@ApiPropertyOptional({
        type: "string",
        format: "binary",
        description: "profile Picture Url (Allow Only 'JPG,JPEG,PNG,SVG')",
        example: "profile.jpg"
    })
	profilePic: any;

}