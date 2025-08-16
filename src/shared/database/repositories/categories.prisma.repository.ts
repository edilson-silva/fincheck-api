import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CategoriesRepository,
  Category,
  CategoryListOutput,
} from './categories.repository';

@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(userId: string, categoryId: string): Promise<Category> {
    const category = await this.prismaService.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    return category;
  }

  async list(userId: string): Promise<CategoryListOutput> {
    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        icon: true,
        type: true,
      },
    });

    return categories;
  }
}
