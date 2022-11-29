import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength, Matches, IsNotEmpty } from "class-validator";
import { IsEqualTo } from "src/shared/decorators/password.decorator";

export class ResetLinkDto{


    @ApiProperty({
        description:"Enter reset password token",
        example:"8ecdb7b0b6291b502d818a387b7a285e632cf0317c7e325b6e2b4e5cb6aae462"
    })
    reset_token:string;

    @ApiProperty({
        description:"Enter user id",
        example:"e8419d91-e17a-422e-a1bc-1796a2578928"
    })
    user_id:string;

}