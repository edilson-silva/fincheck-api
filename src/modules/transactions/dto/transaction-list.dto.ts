import { TransactionDto } from './transaction.dto';

export type TransactionListInputDto = {
  month: number;
  year: number;
  bankAccountId?: string;
};

export type TransactionListOutputDto = {
  transactions: TransactionDto[];
};
