import { Module } from '@nestjs/common';
import { BankAccountOwnershipValidateService } from '../bank-accounts/services/bank-account-ownership-validate.service';
import { CategoryOwnershipValidateService } from '../categories/services/category-ownership-validate.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BankAccountOwnershipValidateService,
    CategoryOwnershipValidateService,
  ],
})
export class TransactionsModule {}
