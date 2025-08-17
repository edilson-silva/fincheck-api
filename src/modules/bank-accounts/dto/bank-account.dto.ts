export class BankAccountDto {
  id: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
  userId: string;
}

export class BankAccountWithCurrentBalanceDto extends BankAccountDto {
  currentBalance: number;
}
