import { IUserRepository } from "../user.repository.interface";
import { AppDataSource } from "../../lib/typeorm/typeorm";
import { ILike, Repository } from "typeorm";
import { IUser, IUserUpdate } from "../../entities/models/user.interface";
import { Users } from "../../entities/user.entity";

export class UserRepository implements IUserRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = AppDataSource.getRepository(Users);
  }

  async createUserRepository(user: IUser): Promise<IUser> {
    return await this.repository.save(user);
  }

  async findUserRepository({
    username,
    email,
    password,
  }: {
    username: string;
    email?: string;
    password: string;
  }): Promise<IUser | undefined> {
    const user = await this.repository.findOne({
      where: {
        username: username,
        email: email,
        password: password,
      },
    });

    return user ? user : undefined;
  }

  async findUserRepositoryById(id?: number): Promise<IUser | undefined> {
    if (!id) return;
    const userId = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    return userId ? userId : undefined;
  }

  async findAllUsersRepository(
    page: number,
    limit: number,
    search?: string
  ): Promise<IUser[]> {
    const params = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (search) {
      return await this.repository.find({
        ...params,
        where: [
          { username: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
        ],
      });
    }

    return await this.repository.find(params);
  }

  async updateUserRepository(
    user: IUserUpdate,
  ): Promise<IUserUpdate | undefined> {
    if (!user.id) {
      throw new Error("Usuário não encontrado");
    }

    const prevUserValues = await this.repository.findOne({
      where: { id: user.id },
    });

    if (!prevUserValues) {
      return undefined;
    }

    const mergedUser = {
      ...prevUserValues,
      ...user,
    };

    await this.repository.update(user.id, mergedUser);
    return mergedUser;
  }

  async deleteUserRepository(userId: number): Promise<void> {
    await this.repository.delete(userId);
  }
}
