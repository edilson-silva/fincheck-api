import 'dotenv/config';

import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  PASSWORD_HASH_SALT: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}

export const env: Env = plainToInstance(Env, process.env, {
  enableImplicitConversion: true,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new InternalServerErrorException(errors);
}
