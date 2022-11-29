import { IsNotEmpty, IsEmail, ValidationArguments } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserTimezoneDto {


    @IsNotEmpty({
        message: `Please enter timezone name.&&&timezone`
    })
    @ApiProperty({
        description: `Enter User Timezone name`,
        example: `IST`
    })
    timezone_name: string;
    

    @IsNotEmpty({
        message: `Please enter timezone offset.&&&offset`
    })
    @ApiProperty({
        description: `Enter Timezone offset`,
        example: `5:30:00.000000`
    })
    timezone_offset: string;

}
