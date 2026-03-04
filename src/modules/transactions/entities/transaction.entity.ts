import { TransactionType } from '../types/transaction-type.type';

export class TransactionEntity {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
}
