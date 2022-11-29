import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UserPlanStatusDto {

    @IsNotEmpty({
        message: `Please enter user id.&&&user_id`
    })
    @ApiProperty({
        description: `Enter user Id`,
        example: `1`
    })
    userId: string;

    @IsBoolean({
        message: `Please select status.&&&status`
    })
    @ApiProperty({
        description: `Enter status`,
        example: true
    })
    status: boolean;
}