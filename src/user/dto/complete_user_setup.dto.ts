import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, ValidationArguments, IsNotEmpty } from 'class-validator';

export class CompleteSetupDto {

    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter User Id`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    user_id: string;


    @ApiPropertyOptional({
        description: `Enter Pronouns`,
        example: `SHE/HER`
    })
    pronouns: string;

    @ApiPropertyOptional({
        description: `Enter your age`,
        example: `28`
    })
    age: number;

    @ApiPropertyOptional({
        description: `Enter Purpose Of Usage`,
        example: `NATUROPATHIC SUPPLEMENTS`
    })
    purpose_of_usage: string;

    @ApiPropertyOptional({
        description: `Enter day to refill pills`,
        example: `Wednesday`
    })
    organise_pills_day: string;

    @ApiPropertyOptional({
        description: `Enter UTC day to refill pills`,
        example: `Wednesday`
    })
    utc_organise_pills_day: string;

    @ApiPropertyOptional({
        description: `Enter time to refill pills`,
        example: `2022-02-01 00:00:00`
    })
    organise_pills_time: Date;

    @ApiPropertyOptional({
        description: `Enter organize pills colour`,
        example: `#ffffff`
    })
    organise_pills_colour: string;

    @ApiPropertyOptional({
        description: `Enter organize pills HSV colour`,
        example: `#ffffff`
    })
    organise_pills_hsv_colour: string;

    @ApiPropertyOptional({
        description: `Enter consumption time in day`,
        example: `2022-02-01 00:00:00`
    })
    consumption_time_morning: Date;

    @ApiPropertyOptional({
        description: `Enter consumption time in evening`,
        example: `2022-02-01 00:00:00`
    })
    consumption_time_evening: Date;

    @ApiPropertyOptional({
        description: `Enter consumption colour for morning`,
        example: `#000000`
    })
    consumption_colour_morning: string;

    @ApiPropertyOptional({
        description: `Enter consumption HSV colour for morning`,
        example: `#000000`
    })
    consumption_hsv_colour_morning: string;

    @ApiPropertyOptional({
        description: `Enter consumption colour for evening`,
        example: `#ffffff`
    })
    consumption_colour_evening: string;

    @ApiPropertyOptional({
        description: `Enter consumption HSV colour for evening`,
        example: `#ffffff`
    })
    consumption_hsv_colour_evening: string;

    @ApiPropertyOptional({
        description: `Enter colour code`,
        example: `[{"morning":"red","evening":"green"}]`
    })
    colour_code: object[];

}