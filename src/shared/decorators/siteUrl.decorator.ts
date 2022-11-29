import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SiteUrl = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return `http://${request.headers.host}`;
    },
);