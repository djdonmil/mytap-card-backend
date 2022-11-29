import { IsNotEmpty, IsEmail, ValidationArguments } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserQrDto {


    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter User Id`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    user_id: string;
    

    @IsNotEmpty({
        message: `Please enter qrTag.&&&qrTag`
    })
    @ApiProperty({
        description: `Enter QR Tag`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    qr_tag: string;

}