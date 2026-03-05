import { BankAccountType } from '../types/bank-account-type.type';

export class BankAccountBalanceEntity {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  type: BankAccountType;
  color: string;
}
