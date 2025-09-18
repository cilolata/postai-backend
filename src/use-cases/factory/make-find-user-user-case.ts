import { UserRepository } from "../../repositories/typeorm/user.repository";
import { FindUserUseCase } from "../user/find-user";

export const makeFindUserUseCase = () => {
    const userRepository = new UserRepository();
    const findUserUseCase = new FindUserUseCase(userRepository);
    return findUserUseCase;
  };
  