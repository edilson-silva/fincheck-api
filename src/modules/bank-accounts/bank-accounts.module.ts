import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsOwnershipValidateService } from './services/bank-accounts-ownership-validate.service';
import { BankAccountsService } from './services/bank-accounts.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, BankAccountsOwnershipValidateService],
  exports: [BankAccountsOwnershipValidateService],
})
export class BankAccountsModule {}
