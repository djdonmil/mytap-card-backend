import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class StatusChangeDto {

    @IsNotEmpty({
        message: `Please enter userId.&&&userId`
    })
    @ApiProperty({
        description: `Enter User Id`,
        example: `c04fe4de-6ad4-4e09-8c6c-539b6ab03bb6`
    })
    userId: string;

    @IsNotEmpty({
        message: `Please enter status.&&&status`
    })
    @ApiProperty({
       enum: [0,1]
    })
    status: number;

}