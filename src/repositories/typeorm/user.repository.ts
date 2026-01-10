import { IUserRepository } from "../user.repository.interface";
import { AppDataSource } from "../../lib/typeorm/typeorm";
import { ILike, Not, Repository } from "typeorm";
import {
  EPermission,
  IUser,
  IUserUpdate,
} from "../../entities/models/user.interface";
import { Users } from "../../entities/user.entity";

export class UserRepository implements IUserRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = AppDataSource.getRepository(Users);
  }

  async createUserRepository(user: IUser): Promise<IUser> {
    if (user?.permission_type === EPermission.ADMIN) {
      throw new Error("Erro ao criar usuário");
    }
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

    return await this.repository.find({
      ...params,
      where: {
        permission_type: Not(EPermission.ADMIN)
      }
    });
  }

  async updateUserRepository(user: IUserUpdate): Promise<IUser[] | undefined> {
    const userId = await this.repository.findOne({
      where: {
        id: user.id
      },
    });

    if (userId?.permission_type === EPermission.ADMIN) {
      throw new Error("Usuario nao pode ser alterado");
    }

    const mergedUser = {
      id: user.id,
      username: user.username ?? userId?.username,
      password: user.password ?? userId?.password,
      email: user.email ?? userId?.email,
    };

    await this.repository.update(mergedUser.id, mergedUser);

    const params = {
      take: 10,
    };
    const users =  await this.repository.find({ 
      ...params,
      where: {
        permission_type: Not(EPermission.ADMIN)
      }
    })

    return users || undefined
  }

  async deleteUserRepository(userId: number): Promise<IUser[] | undefined> {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (user?.permission_type === EPermission.ADMIN) {
      throw new Error("Usuário não pode ser deletado");
    }
    await this.repository.delete(userId);
    const params = {
      take: 10,
    };
    const users =  await this.repository.find({ 
      ...params,
      where: {
        permission_type: Not(EPermission.ADMIN)
      }
    })
    return users || undefined
    
  }
}
