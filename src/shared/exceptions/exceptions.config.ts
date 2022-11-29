import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export function throwError(error) {
    let { status, message } = error;
    
    if (status == 400)
        throw new BadRequestException(message);

    else if (status == 401)
        throw new UnauthorizedException(message);

    else if (status == 403)
        throw new ForbiddenException(message);

    else if (status == 404)
        throw new NotFoundException(message);

    else if (status == 406)
        throw new NotAcceptableException(message);

    else if (status == 409)
        throw new ConflictException(message);

    else if (status == 422)
        throw new BadRequestException(message);

    else
        throw new InternalServerErrorException("OOPS_SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN");
}
