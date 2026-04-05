import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
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
  category: Partial<CategoryEntity>;
}
