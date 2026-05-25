import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

interface UserRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data as keyof typeof user] : user;
  },
);
