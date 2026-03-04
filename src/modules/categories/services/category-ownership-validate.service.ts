import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoryOwnershipValidateService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findByUserId(
      userId,
      categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found.');
    }
  }
}
