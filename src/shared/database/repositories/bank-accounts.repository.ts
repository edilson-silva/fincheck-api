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

export type BankAccountUpdateInput = BankAccountCreateInput;
export type BankAccountUpdateOutput = BankAccountCreateOutput;

export type BankAccountFindOutput = BankAccount;

export type BankAccountDeleteOutput = void;

export abstract class BankAccountsRepository {
  abstract create(
    userId: string,
    bankAccountCreateInput: BankAccountCreateInput,
  ): Promise<BankAccountCreateOutput>;

  abstract list(userId: string): Promise<BankAccountListOutput>;

  abstract update(
    userId: string,
    bankAccountId: string,
    bankAccountUpdateInput: BankAccountUpdateInput,
  ): Promise<BankAccountUpdateOutput>;

  abstract find(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountFindOutput>;

  abstract delete(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountDeleteOutput>;
}
