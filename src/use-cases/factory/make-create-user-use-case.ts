import { UserRepository } from "../../repositories/typeorm/user.repository";
import { CreateUserUseCase } from "../user/create-user";

export const makeCreateUserUseCase = () => {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return createUserUseCase;
};
