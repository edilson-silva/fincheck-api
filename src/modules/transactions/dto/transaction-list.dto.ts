import { TransactionType } from '../entities/transaction-type.entity';
import { TransactionDto } from './transaction.dto';

export type TransactionListInputDto = {
  month: number;
  year: number;
  bankAccountId?: string;
  transactionType?: TransactionType;
};

export type TransactionListOutputDto = {
  transactions: TransactionDto[];
};
