import { UpdateUserUseCase } from "../user/update-user";
import { UserRepository } from "../../repositories/typeorm/user.repository";

export function makeUpdateUserUseCase() {
  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  return updateUserUseCase;
}
