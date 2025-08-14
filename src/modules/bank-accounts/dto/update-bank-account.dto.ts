import { PartialType } from '@nestjs/mapped-types';
import { BankAccountCreateInputDto } from './bank-account-create.dto';

export class UpdateBankAccountDto extends PartialType(
  BankAccountCreateInputDto,
) {}
