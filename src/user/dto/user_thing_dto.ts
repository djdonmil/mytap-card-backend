import { IsNotEmpty, IsEmail, ValidationArguments } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserThingDto {


    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter User Id`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    user_id: string;
    

    @IsNotEmpty({
        message: `Please enter thingName.&&&thingName`
    })
    @ApiProperty({
        description: `Enter Thing Name`,
        example: `ESP32`
    })
    thing: string;

    @IsNotEmpty({
        message: `Please enter wifi.&&&wifi`
    })
    @ApiProperty({
        description: `Enter WiFi SSID`,
        example: `oneclick`
    })
    wifi_ssid: string;

}
