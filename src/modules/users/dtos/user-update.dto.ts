import { PartialType } from '@nestjs/mapped-types';
import { UserCreateInputDto } from './user-create.dto';

export class UserUpdateDto extends PartialType(UserCreateInputDto) {}
