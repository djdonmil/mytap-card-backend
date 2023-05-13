import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../entity/users.entity';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
