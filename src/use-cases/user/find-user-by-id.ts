import { IUser } from "../../entities/models/user.interface";
import { IUserRepository } from "../../repositories/user.repository.interface";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findUserByIdUseCase(id?: number): Promise<IUser | undefined> {
    const user = await this.userRepository.findUserRepositoryById(id);
    return user;
  }
}
