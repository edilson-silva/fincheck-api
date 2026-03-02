import { BankAccountType } from '../types/bank-accounts-type.type';

export class BankAccountEntity {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
}
