import { IsNotEmpty, IsEmail, ValidationArguments, MaxLength, MinLength, Matches } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddProductDto {

    @IsNotEmpty({
        message: `Please enter owner.&&&product_owner`
    })
    @ApiProperty({
        description: `Enter owner id`,
        example: `92bb5aaa-da0a-488c-addd-1f9cd36655e4`
    })
    product_owner: string;

    @IsNotEmpty({
        message: `Please enter product name.&&&product_name`
    })
    @ApiProperty({
        description: `Enter product name`,
        example: `iPhone14 Pro`
    })
    product_name: string;


    @IsNotEmpty({
        message: `Please enter product config.&&&product_config`
    })
    @ApiProperty({
        description: `Enter product config`,
        example: `1TB`
    })
    product_config: string;

    @IsNotEmpty({
        message: `Please enter product issue.&&&product_issue`
    })
    @ApiProperty({
        description: `Enter product issue`,
        example: `Display damage`
    })
    product_issue: string;

    @ApiPropertyOptional({
        description: `Enter product condition`,
        example: `Major dents`
    })
    product_condition: string;

    @ApiPropertyOptional({
        description: `Enter product colour`,
        example:`Deep Purple`
    })
    product_colour: string;

    @IsNotEmpty({
        message: `Please enter product status.&&&repair_status`
    })
    @ApiProperty({
        description: `Enter product status`,
        example: 1
    })
    repair_status: number;


    @IsNotEmpty({
        message: `Please enter estimated delivery date.&&&estimated_delivery`
    })
    @ApiProperty({
        description: `Enter estimated delivery date`,
        example: "2022-12-30T00:00:00Z"
    })
    estimated_delivery: Date;

    @ApiPropertyOptional({
        description: `Enter estimated actual delivery date`,
        example: "2022-12-29T00:00:00Z"
    })
    actual_delivery: Date;

    @IsNotEmpty({
        message: `Please enter inward date.&&&inward_date`
    })
    @ApiProperty({
        description: `Enter estimated inward date`,
        example: "2022-12-20T00:00:00Z"
    })
    inward_date: Date;

}