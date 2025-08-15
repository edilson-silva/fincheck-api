import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/bank-account-type.entity';

export class BankAccountCreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  initialBalance: number;

  @IsString()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}

export type BankAccountCreateOutputDto = void;
