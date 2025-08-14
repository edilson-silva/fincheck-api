import { BankAccountType } from 'src/modules/bank-accounts/entities/bank-account';

export type BankAccount = {
  id: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
  userId: string;
};

export type BankAccountCreateInput = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export type BankAccountCreateOutput = void;

export type BankAccountListOutput = BankAccount[];

export abstract class BankAccountsRepository {
  abstract create(
    userId: string,
    bankAccountCreateInput: BankAccountCreateInput,
  ): Promise<BankAccountCreateOutput>;

  abstract list(userId: string): Promise<BankAccountListOutput>;
}
