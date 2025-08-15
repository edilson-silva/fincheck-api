import { TransactionCreateInputDto } from 'src/modules/transactions/dto/transaction-create.dto';

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

export type TrnsactionCreateInputDto = {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: string;
};
export type TransactionCreateOutputDto = void;

export type TransactionListOutput = Transaction[];

export abstract class TransactionsRepository {
  abstract create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto>;

  abstract list(userId: string): Promise<TransactionListOutput>;
}
