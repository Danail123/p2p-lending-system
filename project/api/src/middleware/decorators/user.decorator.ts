import { User } from './../../database/entities/user.entity';
// tslint:disable:next-line: variable-name
import { createParamDecorator } from '@nestjs/common';

export const InjectUser = createParamDecorator((_, req): User => req.user);
