import { PartialType } from '@nestjs/mapped-types';
import { BankAccountCreateDto } from './bank-account-create.dto';

export class UpdateBankAccountDto extends PartialType(BankAccountCreateDto) {}
