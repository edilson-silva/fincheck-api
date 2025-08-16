export type Category = {
  id: string;
  name: string;
  icon: string;
  type: string;
};

export type CategoryListOutput = Category[];

export abstract class CategoriesRepository {
  abstract find(userId: string, categoryId: string): Promise<Category>;
  abstract list(userId: string): Promise<CategoryListOutput>;
}
