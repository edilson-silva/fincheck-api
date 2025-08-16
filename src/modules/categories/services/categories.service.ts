import { Injectable } from '@nestjs/common';
import {
  CategoriesRepository,
  CategoryListOutput,
} from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async list(userId: string): Promise<CategoryListOutput> {
    const categories = await this.categoriesRepository.list(userId);

    return categories;
  }
}
