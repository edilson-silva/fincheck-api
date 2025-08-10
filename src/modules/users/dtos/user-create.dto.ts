import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export type UserCreateOutputDto = void;
