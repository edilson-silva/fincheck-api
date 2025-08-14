import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { BankAccountsService } from './bank-accounts.service';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './dto/bank-account-create.dto';
import { BankAccountDeleteOutputDto } from './dto/bank-account-delete.dto';
import { BankAccountListOutputDto } from './dto/bank-account-list.dto';
import {
  BankAccountUpdateInputDto,
  BankAccountUpdateOutputDto,
} from './dto/bank-account-update.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: BankAccountCreateInputDto,
  ): Promise<BankAccountCreateOutputDto> {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string): Promise<BankAccountListOutputDto> {
    return this.bankAccountsService.list(userId);
  }

  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: BankAccountUpdateInputDto,
  ): Promise<BankAccountUpdateOutputDto> {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDto,
    );
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ): Promise<BankAccountDeleteOutputDto> {
    return this.bankAccountsService.delete(userId, bankAccountId);
  }
}
