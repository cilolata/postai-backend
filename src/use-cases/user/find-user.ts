import { IUser } from "../../entities/models/user.interface";
import { IUserRepository } from "../../repositories/user.repository.interface";


export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findUserUseCase({username, email, password}: {username: string, email?: string, password: string}): Promise<IUser | undefined> {
    const user = await this.userRepository.findUserRepository({username, email, password});
    return user;
  }
}
