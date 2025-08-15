import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { TransactionListOutputDto } from './dto/transaction-list.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  list(@ActiveUserId() userId: string): Promise<TransactionListOutputDto> {
    return this.transactionsService.list(userId);
  }
}
