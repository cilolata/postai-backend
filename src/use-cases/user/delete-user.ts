import { IUserRepository } from "../../repositories/user.repository.interface";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async deleteUserUseCase(userId: number): Promise<void | undefined> {
    return this.userRepository.deleteUserRepository(userId);
  }
}
