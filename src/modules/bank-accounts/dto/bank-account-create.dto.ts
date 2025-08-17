import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { BankAccountType } from '../entities/bank-account-type.entity';

export class BankAccountCreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
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
