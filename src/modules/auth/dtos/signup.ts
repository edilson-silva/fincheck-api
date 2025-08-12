import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupInputDto {
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

export type SignupOutputDto = {
  accessToken: string;
};
