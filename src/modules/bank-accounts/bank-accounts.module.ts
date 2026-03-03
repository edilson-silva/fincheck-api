import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountOwnershipValidateService } from './services/bank-account-ownership-validate.service';
import { BankAccountsService } from './services/bank-accounts.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, BankAccountOwnershipValidateService],
  exports: [BankAccountOwnershipValidateService],
})
export class BankAccountsModule {}
