import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsInt()
  @Min(10)
  @Max(20)
  BCRYPT_SALT: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  JWT_SECRET: string;
}

export const env: Env = plainToInstance(Env, {
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT),
  JWT_SECRET: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(errors, null, 2)}`,
  );
}
