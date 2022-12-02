import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Matches, ValidationArguments } from "class-validator";
import { OrderDir } from "../../shared/enums/order_dir.enum";

export class ListProductsDto {

    
    @IsNotEmpty({ message: "Please enter count" })
    @ApiProperty({
        description: "Enter count ",
        example: 0
    })
    count: number;

    @IsNumberString({},{
        message: "Offset contain only number"
    })
    @IsNotEmpty({ message: "Please enter offset" })
    @ApiProperty({
        description: "Enter offset ",
        example: 0
    })
    offset: number;

    @IsNumberString({},{
        message: "Limit contain only number"
    })
    @IsNotEmpty({
        message: "Please enter limit"
    })
    @ApiProperty({
        description: "Enter limit ",
        example: 0
    })
    limit: number;

    @IsString({
        message:"Order by contain only string"
    })    
    @IsEnum(['createdAt','email','firstName','lastName','estimatedDelivery'])
    @ApiProperty({
        description:"Please enter order by (createdAt)",
        example:'estimatedDelivery'
    })
    orderBy: string

    @IsEnum(['DESC', 'ASC'], {
        message: (args: ValidationArguments) => {
            if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
                return `Please select order dir.`
            }
            else {
                return `Please select valid order dir('DESC', 'ASC').`
            }
        }
    })
    @ApiProperty({
        description: "Please select orderdir (DESC,ASC)",
        example: 'ASC'
    })
    orderDir: OrderDir;
        
    @ApiProperty({
        required: false,
        description: "Enter status"
    })
    status: number

    @ApiProperty({
        required: false,
        description: "Enter user search criteria"
    })
    userSearch: string

    @ApiProperty({
        required: false,
        description: "Enter product nameor config"
    })
    productSearch: string

}