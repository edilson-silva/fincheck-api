import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoriesRepository,
  Category,
} from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesOwnershipValidateService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string): Promise<Category> {
    const category = await this.categoriesRepository.find(userId, categoryId);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
