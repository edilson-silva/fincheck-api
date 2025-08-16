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

export type TransactionUpdateInput = TransactionCreateInput;
export type TransactionUpdateOutput = TransactionCreateOutput;

export type TransactionListOutput = Transaction[];

export type TransactionFindOutput = Transaction;

export abstract class TransactionsRepository {
  abstract create(
    userId: string,
    transactionCreateInput: TransactionCreateInput,
  ): Promise<TransactionCreateOutput>;

  abstract update(
    userId: string,
    transactionId: string,
    transactionUpdateInput: TransactionUpdateInput,
  ): Promise<TransactionUpdateOutput>;

  abstract list(userId: string): Promise<TransactionListOutput>;

  abstract find(
    userId: string,
    transactionId: string,
  ): Promise<TransactionFindOutput>;
}
