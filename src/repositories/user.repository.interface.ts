import { IUser, IUserUpdate } from "../entities/models/user.interface";

export interface IUserRepository {
  createUserRepository(user: IUser): Promise<IUser | undefined>;
  findUserRepositoryById(id?: number): Promise<IUser | undefined>;
  findUserRepository({
    username,
    email,
    password,
  }: {
    username: string;
    email?: string;
    password: string;
  }): Promise<IUser | undefined>;
  updateUserRepository(user: IUserUpdate): Promise<IUserUpdate | undefined>;
  deleteUserRepository(userId: number): Promise<void>;
  findAllUsersRepository(page: number, limit: number, search?: string): Promise<IUser[] | []>;

}
