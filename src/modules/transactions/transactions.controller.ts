import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './dto/transaction-create.dto';
import { TransactionListOutputDto } from './dto/transaction-list.dto';
import {
  TransactionUpdateInputDto,
  TransactionUpdateOutputDto,
} from './dto/transaction-update.dto';
import { TransactionsService } from './services/transactions.service';

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

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body()
    transactionUpdateInputDto: TransactionUpdateInputDto,
  ): Promise<TransactionUpdateOutputDto> {
    return this.transactionsService.update(
      userId,
      transactionId,
      transactionUpdateInputDto,
    );
  }

  @Get()
  list(@ActiveUserId() userId: string): Promise<TransactionListOutputDto> {
    return this.transactionsService.list(userId);
  }
}
