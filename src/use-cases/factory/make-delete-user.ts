import { UserRepository } from "../../repositories/typeorm/user.repository";
import { DeleteUserUseCase } from "../user/delete-user";

export const makeDeleteUserByIdUseCase = () => {
  const userRepository = new UserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  return deleteUserUseCase;
};
