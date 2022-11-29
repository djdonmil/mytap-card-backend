import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileDto {
    
    @IsNotEmpty()
	@ApiProperty({
		description: "User profile pic",
		example: "abc.jpg",
	})
	profilePic: any;	
}
