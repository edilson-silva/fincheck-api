import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './dto/transaction-create.dto';
import { TransactionListOutputDto } from './dto/transaction-list.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto> {
    return this.transactionsService.create(userId, transactionCreateInputDto);
  }

  @Get()
  list(@ActiveUserId() userId: string): Promise<TransactionListOutputDto> {
    return this.transactionsService.list(userId);
  }
}
