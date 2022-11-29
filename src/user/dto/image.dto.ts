import { IsOptional, IsNotEmpty } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class ImageDto {
	
	@ApiProperty({
        type: "string",
        format: "binary",
        description: "profile Picture Url (Allow Only 'JPG,JPEG,PNG,SVG')",
        example: "profile.jpg"
    })
    profilePic: any;
    
    @IsNotEmpty()
	@ApiProperty({
		description: "User ID",
		example: "1",
	})
	userId: string;

    
}
