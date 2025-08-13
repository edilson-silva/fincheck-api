import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { CategoriesService } from './categories.service';
import { CategoryListOutputDto } from './dto/category-list.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async list(@ActiveUserId() userId: string): Promise<CategoryListOutputDto> {
    const categories = await this.categoriesService.list(userId);

    return { categories };
  }
}
