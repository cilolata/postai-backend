import { IUser } from "../../entities/models/user.interface";
import { IUserRepository } from "../../repositories/user.repository.interface";

export class FindAllUsersUserUseCase {
    constructor(private userRepository: IUserRepository) {}
  
    async findAllUsersUseCase(
      page: number,
      limit: number,
      search?: string
    ): Promise<IUser[] | undefined> {
      const searchTermNormalize = search ? search
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') : undefined;
        
      const posts = await this.userRepository.findAllUsersRepository(
        Number(page),
        Number(limit),
        searchTermNormalize
      );
      return posts;
    }
  }
  