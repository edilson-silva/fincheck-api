import { BankAccountType } from 'src/modules/bank-accounts/entities/bank-account-type.entity';

export class BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
  userId: string;
}

export class BankAccountWithBalance extends BankAccount {
  currentBalance: number;
}

export type BankAccountCreateInput = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};
export type BankAccountCreateOutput = void;

export type BankAccountFindOutput = BankAccount;

export type BankAccountListOutput = BankAccountWithBalance[];

export type BankAccountUpdateInput = BankAccountCreateInput;
export type BankAccountUpdateOutput = BankAccountCreateOutput;

export type BankAccountDeleteOutput = void;

export abstract class BankAccountsRepository {
  abstract create(
    userId: string,
    bankAccountCreateInput: BankAccountCreateInput,
  ): Promise<BankAccountCreateOutput>;

  abstract find(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountFindOutput>;

  abstract list(userId: string): Promise<BankAccountListOutput>;

  abstract update(
    bankAccountId: string,
    bankAccountUpdateInput: BankAccountUpdateInput,
  ): Promise<BankAccountUpdateOutput>;

  abstract delete(bankAccountId: string): Promise<BankAccountDeleteOutput>;
}
