import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BankAccountEntity } from '../entities/bank-account.entity';
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

export type UpdateBankAccountOutputDto = BankAccountEntity;
