export type Transaction = {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId?: string;
  initialBalance: number;
  name: string;
  value: number;
  date: Date;
  type: string;
};

export type TransactionListOutput = Transaction[];

export abstract class TransactionsRepository {
  abstract list(userId: string): Promise<TransactionListOutput>;
}
