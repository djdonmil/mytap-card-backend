import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common";
import { Request, Response } from "express";
import { Translation } from "src/shared/utility/translation.utility";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		let lang = request.headers.language || request?.body?.language || request?.query?.language || request?.params?.language;

		const status = exception.getStatus();
		const errors = this.filterResponse(exception.getResponse()["message"],lang);

		response
			.status(422)
			// you can manipulate the response here
			.json({
				message: errors[0].display_error,
				developer_errors: errors,
			});
	}
	filterResponse(message, lang = "en") {
		console.log(message);

		if (!Array.isArray(message)) {
			message = [message];
		}

		// if (message == "Only Images are allowed&&&") {
		// 	message = [message];
		// }
		// message = [message];
		if (message.length) {
			let result = [];
			for (let i = 0; i < message.length; i++) {
				let errors = message[i].split("&&&");
				let error = {};
				if (errors.length > 2) {
					result.push({
						key: errors[1],
						error_type: "system",
						actual_error: Translation.Translater("en", "error", errors[0]),
						display_error: Translation.Translater(lang || "en", "error", errors[2]),
					});
				} else {
					result.push({
						key: errors[1],
						error_type: "ui",
						actual_error: Translation.Translater("en", "error", errors[0]),
						display_error: Translation.Translater(lang || "en", "error", errors[0]),
					});
				}
			}

			return result;
		}
	}
}
