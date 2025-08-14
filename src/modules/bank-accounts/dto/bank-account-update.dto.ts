import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './bank-account-create.dto';

export class UpdateBankAccountInputDto extends BankAccountCreateInputDto {}

export type UpdateBankAccountOutputDto = BankAccountCreateOutputDto;
