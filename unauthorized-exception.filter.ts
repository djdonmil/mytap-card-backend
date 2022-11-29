import { Catch, UnauthorizedException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { Translation } from "src/shared/utility/translation.utility";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
	catch(exception: UnauthorizedException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		let lang = request.headers.language || request?.body?.language || request?.query?.language || request?.params?.language;

		const errors = this.filterResponse(exception.getResponse()["message"], lang);

		response
			.status(401)
			// you can manipulate the response here
			.json({
				message: errors[0].display_error,
				developer_errors: errors,
			});
	}

	filterResponse(message, lang = "en") {
		let msg = [];
		let error;
		if (typeof message !== "undefined" && message == "Unauthorized") error = "Please login to continue";
		else error = message || "Unauthorized";

		msg.push(error);
		// return msg;

		if (msg.length) {
			let result = [];
			for (let i = 0; i < msg.length; i++) {
				let errors = msg[i].split("&&&");
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
