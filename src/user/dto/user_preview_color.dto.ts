import { IsNotEmpty, IsEmail, ValidationArguments } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserPreviewColour {


    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter User Id`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    user_id: string;

    @IsNotEmpty({
        message: `Please enter thingId.&&&thingId`
    })
    @ApiProperty({
        description: `Enter Thing Id`,
        example: `ESP32`
    })
    thing_id: string;


    @IsNotEmpty({
        message: `Please enter colorCode.&&&colorCode`
    })
    @ApiProperty({
        description: `Enter Color Code`,
        example: `#00FFFF`
    })
    color_code: string;

    @IsNotEmpty({
        message: `Please enter preview type.&&&previewType`
    })
    @ApiProperty({
        description: `Enter preview type(1= isPreview true,2= isPreview false)`,
        example: 1
    })
    is_preview: number;

}
