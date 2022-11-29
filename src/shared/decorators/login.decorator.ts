import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as config from 'config';
import jwt_decode from 'jwt-decode';

export const LogInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let authorization = request.headers.authorization || '';
    if (authorization) {
      authorization = jwt_decode(authorization);
      //console.log(authorization);

      const { user_id, iat } = authorization;
    }
    return authorization;
  },
);
