import { IUserUpdate } from "../../entities/models/user.interface";
import { IUserRepository } from "../../repositories/user.repository.interface";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async updateUserUseCase(user: IUserUpdate): Promise<IUserUpdate | undefined> {
    return await this.userRepository.updateUserRepository(user);
  }
}
