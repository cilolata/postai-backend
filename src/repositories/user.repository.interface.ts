import { IUser } from "../entities/models/user.interface";

export interface IUserRepository {
  createUserRepository(user: IUser): Promise<IUser | undefined>;
  findUserRepositoryById(id?: number): Promise<IUser | undefined>;
  findUserRepository({
    username,
    email,
    password
  }: {
    username: string;
    email?: string;
    password: string;
  }): Promise<IUser | undefined>;
}
