import { IsNotEmpty, IsEmail, ValidationArguments } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
	
    @IsEmail(
		{},
		{
			message: (args: ValidationArguments) => {
				if (typeof args.value == "undefined" || args.value == "") {
					return `Please enter email address.&&&email`;
				} else {
					return `Please Enter valid email address.&&&email`;
				}
			},
		},
	)
    @ApiProperty({
        description:'User Email',
        example:'admin@mytap.com'
    })
    email:string;

    @IsNotEmpty({
		message: `Please enter password.&&&password`,
	})
    @ApiProperty({
        description:'Password',
        example:'Mytap1@'
    })
    password:string;
}