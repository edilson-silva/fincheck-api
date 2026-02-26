import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
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

export class CreateUserOutputDto {
  id: string;
  name: string;
  email: string;
}
