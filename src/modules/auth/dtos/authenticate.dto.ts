import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateInputDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export type AuthenticateOutputDto = {
  accessToken: string;
};
