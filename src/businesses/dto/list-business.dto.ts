import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, ValidationArguments } from "class-validator";
import { OrderDir } from "src/shared/enums/order_dir.enum";

export class ListBusinessDto {

    @ApiPropertyOptional({
        description: 'Limit',
        example: 10
    })
    limit: number;

    @ApiPropertyOptional({
        description: 'Page number',
        example: 1
    })
    page_no: number;

    @ApiPropertyOptional({
        description: `Search business name`,
        example: `nav`
    })
    search: string


    @IsString({
        message:"Order by contain only string"
    })    
    @ApiProperty({
        description:"Please enter order by (createdAt)",
        example:'createdAt'
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
        example: 'DESC'
    })
    orderDir: OrderDir;

}