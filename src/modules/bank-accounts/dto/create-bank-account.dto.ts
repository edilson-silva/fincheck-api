import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { BankAccountType } from '../types/bank-accounts-type.type';

export class CreateBankAccountInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  initialBalance: number;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @IsHexColor()
  @IsNotEmpty()
  color: string;
}

export type CreateBankAccountOutputDto = BankAccountEntity;
