import { IsNotEmpty, IsEmail, ValidationArguments, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EditUserAdminDto {

    @IsNotEmpty({
        message: `Please enter your first name.&&&first_name`
    })
    @ApiProperty({
        description: `Enter First Name`,
        example: `Jon`
    })
    first_name: string;

    @IsNotEmpty({
        message: `Please enter your last name.&&&last_name`
    })
    @ApiProperty({
        description: `Enter Last Name`,
        example: `Doe`
    })
    last_name: string;

    @IsNotEmpty({
        message: `Please enter account status`
    })
    @ApiProperty({
        description: `Enter account status`,
        example: true
    })
    is_active: boolean;
}