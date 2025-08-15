export type TransactionDto = {
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
