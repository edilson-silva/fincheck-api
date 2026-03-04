import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { ListCategoriesOutputDto } from './dto/list-categories.dto';
import { CategoriesService } from './services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async listByUserId(
    @ActiveUserId() userId: string,
  ): Promise<ListCategoriesOutputDto> {
    return await this.categoriesService.listByUserId(userId);
  }
}
