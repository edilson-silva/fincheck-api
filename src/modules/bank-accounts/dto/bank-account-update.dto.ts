import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './bank-account-create.dto';

export class BankAccountUpdateInputDto extends BankAccountCreateInputDto {}

export type BankAccountUpdateOutputDto = BankAccountCreateOutputDto;
