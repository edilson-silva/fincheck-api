import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BankAccountType } from '../types/bank-accounts-type.type';

export class UpdateBankAccountInputDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  initialBalance: number;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  @IsOptional()
  type: BankAccountType;

  @IsHexColor()
  @IsNotEmpty()
  @IsOptional()
  color: string;
}

export class UpdateBankAccountOutputDto {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
}
