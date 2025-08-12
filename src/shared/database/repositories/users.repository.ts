export type UserCreateCategoryInput = {
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
};

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
  categories?: UserCreateCategoryInput[];
};

export type UserCreateOutput = {
  id: string;
};

export type UserFindOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export abstract class UsersRepository {
  abstract create(userCreateDto: UserCreateInput): Promise<UserCreateOutput>;
  abstract findByEmail(email: string): Promise<UserFindOutput | null>;
}
