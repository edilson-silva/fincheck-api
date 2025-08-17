export type TransactionDto = {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date;
  type: string;
};

export type TransactionResumeDto = {
  type: string;
  value: number;
};
