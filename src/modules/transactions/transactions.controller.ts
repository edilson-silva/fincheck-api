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
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './dto/transaction-create.dto';
import { TransactionDeleteOutputDto } from './dto/transaction-delete.dto';
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

  @Get()
  list(@ActiveUserId() userId: string): Promise<TransactionListOutputDto> {
    return this.transactionsService.list(userId);
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

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ): Promise<TransactionDeleteOutputDto> {
    return this.transactionsService.delete(userId, transactionId);
  }
}
