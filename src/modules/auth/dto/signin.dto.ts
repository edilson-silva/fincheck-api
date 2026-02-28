import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInInputDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SignInOutputDto {
  accessToken: string;
}
