import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';
import { ListCategoriesOutputDto } from './dto/list-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async listByUserId(userId: string): Promise<ListCategoriesOutputDto> {
    return await this.categoriesRepository.listByUserId(userId);
  }
}
