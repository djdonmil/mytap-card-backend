import { IsNotEmpty, IsEmail, ValidationArguments, MaxLength, MinLength, Matches } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddBusinessDto {

    @IsNotEmpty({
        message: `Please enter your business name.&&&business_name`
    })
    @ApiProperty({
        description: `Enter Business Name`,
        example: `Jon`
    })
    business_name: string;


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
    @ApiPropertyOptional({
        description: `Enter business email id`,
        example: `contact@navkarindustries.com`
    })
    business_email: string;

   
    @ApiPropertyOptional({
        description: `Enter domain`,
        example: `navkarindustries.com`
    })
    domain: string;


}