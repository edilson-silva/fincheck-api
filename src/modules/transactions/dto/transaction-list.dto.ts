import { TransactionDto } from './transaction.dto';

export type TransactionListInputDto = {
  month: number;
  year: number;
};

export type TransactionListOutputDto = {
  transactions: TransactionDto[];
};
