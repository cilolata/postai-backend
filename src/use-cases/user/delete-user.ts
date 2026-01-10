import { IUser } from "../../entities/models/user.interface";
import { IUserRepository } from "../../repositories/user.repository.interface";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async deleteUserUseCase(userId: number): Promise<IUser[] | undefined> {
    return this.userRepository.deleteUserRepository(userId);
  }
}
