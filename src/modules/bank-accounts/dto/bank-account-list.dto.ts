import { BankAccountWithCurrentBalanceDto } from './bank-account.dto';

export type BankAccountListOutputDto = {
  bankAccounts: BankAccountWithCurrentBalanceDto[];
};
