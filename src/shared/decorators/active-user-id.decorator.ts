import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) throw new UnauthorizedException();

    return userId;
  },
);
