import { BankAccountType } from 'src/modules/bank-accounts/entities/bank-account';

export type BankAccountCreateInput = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export type BankAccountCreateOutput = void;

export abstract class BankAccountsRepository {
  abstract create(
    userId: string,
    bankAccountCreateInput: BankAccountCreateInput,
  ): Promise<BankAccountCreateOutput>;
}
