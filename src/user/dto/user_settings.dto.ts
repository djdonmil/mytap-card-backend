import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserSettingsDto {

    @IsNotEmpty({
        message: `Please add reminder type`
    })
    @ApiProperty({
        description: `Enter reminder type`,
        example: `0 - Loba Light, 1 - Push Notification, 2 - Both`
    })
    reminder: number;

    @IsNotEmpty({
        message: `Please add app color`
    })
    @ApiProperty({
        description: `Enter app color type`,
        example: `0 - Light Mode, 1 - Dark Mode`
    })
    appColor: number;
}