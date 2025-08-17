import { TransactionType } from 'src/modules/transactions/entities/transaction-type.entity';

export type Transaction = {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date;
  type: string;
};

export type TransactionCreateInput = {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
};
export type TransactionCreateOutput = void;

export type TransactionFindOutput = Transaction;

export type TransactionListInput = {
  month: number;
  year: number;
  bankAccountId?: string;
  transactionType?: TransactionType;
};
export type TransactionListOutput = Transaction[];

export type TransactionUpdateInput = TransactionCreateInput;
export type TransactionUpdateOutput = TransactionCreateOutput;

export type TransactionDeleteOutput = void;

export abstract class TransactionsRepository {
  abstract create(
    userId: string,
    transactionCreateInput: TransactionCreateInput,
  ): Promise<TransactionCreateOutput>;

  abstract find(
    userId: string,
    transactionId: string,
  ): Promise<TransactionFindOutput>;

  abstract list(
    userId: string,
    transactionListInput: TransactionListInput,
  ): Promise<TransactionListOutput>;

  abstract update(
    transactionId: string,
    transactionUpdateInput: TransactionUpdateInput,
  ): Promise<TransactionUpdateOutput>;

  abstract delete(transactionId: string): Promise<TransactionDeleteOutput>;
}
