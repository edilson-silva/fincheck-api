import { Module } from '@nestjs/common';
import { BankAccountOwnershipValidateService } from '../bank-accounts/services/bank-account-ownership-validate.service';
import { CategoryOwnershipValidateService } from '../categories/services/category-ownership-validate.service';
import { TransactionOwnershipValidateService } from './services/transaction-ownership-validate.service';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BankAccountOwnershipValidateService,
    CategoryOwnershipValidateService,
    TransactionOwnershipValidateService,
  ],
})
export class TransactionsModule {}
