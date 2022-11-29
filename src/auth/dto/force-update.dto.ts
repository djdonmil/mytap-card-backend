import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsIn } from "class-validator";
import * as config from "config";
// const errorMessage = config.get("errorMessage");

export class ForceUpdateDto {

	@IsNotEmpty({
		message: "ENTER_LANGUAGE&&&language",
	})
	@ApiProperty({
		description: "Language code",
		example: "en",
	})
	language: string;

	@IsIn([1, 2], {
		message: `DEVICE_TYPE&&&device_type}`,
	})
	@IsNotEmpty({ message: "DEVICE_TYPE_MISSING&&&device_type&&&" })
	@ApiProperty({
		description: "Enter device_type",
		example: 1,
	})
	device_type: number;

	@IsNotEmpty({ message: "APP_VERSION_MISSING&&&app_version&&&" })
	@ApiProperty({
		description: "Enter app_version",
		example: "1.0.0",
	})
	app_version: string;
}
